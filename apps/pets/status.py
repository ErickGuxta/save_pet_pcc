from datetime import date, datetime, time, timedelta

from django.utils import timezone


REQUIRED_PROFILE_FIELDS = [
    "nome",
    "especie",
    "sexo",
    "raca",
    "data_nascimento",
    "pelagem",
    "peso",
]


def build_pet_statuses(pet, today=None):
    today = today or timezone.localdate()
    upcoming_limit = today + timedelta(days=30)
    vaccines = list(getattr(pet, "vacinas").all())
    statuses = []

    booster_dates = [vaccine.data_reforco for vaccine in vaccines if vaccine.data_reforco]
    if booster_dates:
        if any(booster_date < today for booster_date in booster_dates):
            statuses.append({"label": "Vacina vencida", "style": "danger"})
        elif any(today <= booster_date <= upcoming_limit for booster_date in booster_dates):
            statuses.append({"label": "Reforço próximo", "style": "warning"})
        else:
            statuses.append({"label": "Vacinas em dia", "style": "success"})
    elif vaccines:
        statuses.append({"label": "Sem reforço previsto", "style": "muted"})
    else:
        statuses.append({"label": "Sem vacina", "style": "warning"})

    if not hasattr(pet, "rastreador"):
        statuses.append({"label": "Sem rastreador", "style": "muted"})

    if any(not getattr(pet, field) for field in REQUIRED_PROFILE_FIELDS):
        statuses.append({"label": "Cadastro incompleto", "style": "warning"})

    return statuses


def build_pet_timeline(pet):
    events = []

    events.append(
        {
            "date": pet.data_nascimento,
            "title": "Nascimento",
            "description": f"{pet.nome} nasceu.",
            "kind": "pet",
        }
    )

    for vaccine in pet.vacinas.all():
        events.append(
            {
                "date": vaccine.data_aplicacao,
                "title": f"Vacina aplicada: {vaccine.nome}",
                "description": f"Lote {vaccine.lote} · {vaccine.clinica}",
                "kind": "vaccine",
            }
        )
        if vaccine.data_reforco:
            events.append(
                {
                    "date": vaccine.data_reforco,
                    "title": f"Reforço previsto: {vaccine.nome}",
                    "description": f"Veterinário: {vaccine.veterinario}",
                    "kind": "booster",
                }
            )

    if hasattr(pet, "rastreador"):
        tracker = pet.rastreador
        events.append(
            {
                "date": tracker.data_vinculacao,
                "title": "Rastreador vinculado",
                "description": f"{tracker.identificador} · {tracker.modelo}",
                "kind": "tracker",
            }
        )
        last_location = tracker.ultima_localizacao
        if last_location:
            events.append(
                {
                    "date": last_location.timestamp,
                    "title": "Última localização registrada",
                    "description": f"{last_location.latitude}, {last_location.longitude}",
                    "kind": "location",
                }
            )

    events.append(
        {
            "date": pet.data_atualizacao_saude,
            "title": "Informações de saúde atualizadas",
            "description": "Alergias, doenças, medicamentos ou observações revisados.",
            "kind": "health",
        }
    )

    for event in events:
        event["date_label"] = _date_label(event["date"])

    return sorted(events, key=lambda event: _sortable_date(event["date"]), reverse=True)


def _sortable_date(value):
    if isinstance(value, datetime):
        return value
    if isinstance(value, date):
        return timezone.make_aware(datetime.combine(value, time.min))
    return timezone.now()


def _date_label(value):
    if isinstance(value, datetime):
        return timezone.localtime(value).strftime("%d/%m/%Y %H:%M")
    if isinstance(value, date):
        return value.strftime("%d/%m/%Y")
    return ""
