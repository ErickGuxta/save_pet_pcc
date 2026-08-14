import json

from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.utils.dateformat import format as date_format
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_POST

from .forms import LocalizacaoForm, RastreadorForm
from .models import Localizacao, Rastreador


def _localizacao_payload(localizacao):
    return {
        "id": localizacao.id,
        "latitude": localizacao.latitude,
        "longitude": localizacao.longitude,
        "timestamp": localizacao.timestamp.isoformat(),
        "timestamp_formatado": date_format(localizacao.timestamp, "d/m/Y H:i:s"),
    }


@login_required
def index(request):
    rastreadores = (
        Rastreador.objects.filter(pet__usuario=request.user)
        .select_related("pet")
        .prefetch_related("localizacoes")
    )
    form = RastreadorForm(user=request.user)

    if request.method == "POST":
        form = RastreadorForm(request.POST, user=request.user)

        if form.is_valid():
            form.save()
            messages.success(request, "Rastreador vinculado com sucesso.")
            return redirect("locator:index")

    context = {
        "rastreadores": rastreadores,
        "form": form,
        "ultima_localizacao": (
            Localizacao.objects.filter(rastreador__pet__usuario=request.user)
            .select_related("rastreador", "rastreador__pet")
            .first()
        ),
    }
    if context["ultima_localizacao"]:
        ultima = context["ultima_localizacao"]
        context["map_bbox"] = {
            "min_lng": ultima.longitude - 0.015,
            "min_lat": ultima.latitude - 0.010,
            "max_lng": ultima.longitude + 0.015,
            "max_lat": ultima.latitude + 0.010,
        }

    return render(request, "locator/index.html", context)


@login_required
def detail(request, id):
    rastreador = get_object_or_404(
        Rastreador.objects.select_related("pet"),
        id=id,
        pet__usuario=request.user,
    )
    localizacoes = rastreador.localizacoes.all()
    form = LocalizacaoForm()

    if request.method == "POST":
        form = LocalizacaoForm(request.POST)

        if form.is_valid():
            localizacao = form.save(commit=False)
            localizacao.rastreador = rastreador
            localizacao.save()
            messages.success(request, "Localizacao registrada com sucesso.")
            return redirect("locator:detail", id=rastreador.id)

    context = {
        "rastreador": rastreador,
        "localizacoes": localizacoes,
        "ultima_localizacao": rastreador.ultima_localizacao,
        "form": form,
    }
    if context["ultima_localizacao"]:
        ultima = context["ultima_localizacao"]
        context["map_bbox"] = {
            "min_lng": ultima.longitude - 0.015,
            "min_lat": ultima.latitude - 0.010,
            "max_lng": ultima.longitude + 0.015,
            "max_lat": ultima.latitude + 0.010,
        }

    return render(request, "locator/detail.html", context)


@login_required
def create(request):
    form = RastreadorForm(user=request.user)

    if request.method == "POST":
        form = RastreadorForm(request.POST, user=request.user)

        if form.is_valid():
            form.save()
            messages.success(request, "Rastreador vinculado com sucesso.")
            return redirect("locator:index")
        else:
            context = {
                "form": form,
            }
            return render(request, "locator/create.html", context)

    context = {
        "form": form,
    }

    return render(request, "locator/create.html", context)


@login_required
def edit(request, id):
    rastreador = get_object_or_404(Rastreador, id=id, pet__usuario=request.user)
    form = RastreadorForm(instance=rastreador, user=request.user)

    if request.method == "POST":
        form = RastreadorForm(request.POST, instance=rastreador, user=request.user)

        if form.is_valid():
            form.save()
            messages.success(request, "Rastreador atualizado com sucesso.")
            return redirect("locator:index")
        else:
            context = {
                "form": form,
            }
            return render(request, "locator/edit.html", context)

    context = {
        "form": form,
    }

    return render(request, "locator/edit.html", context)


@login_required
def delete(request, id):
    rastreador = get_object_or_404(Rastreador, id=id, pet__usuario=request.user)
    rastreador.delete()
    messages.success(request, "Rastreador excluido com sucesso.")
    return redirect("locator:index")


@login_required
@require_GET
def ultima_localizacao_api(request, id):
    rastreador = get_object_or_404(
        Rastreador,
        id=id,
        pet__usuario=request.user,
    )
    localizacao = rastreador.ultima_localizacao

    if localizacao is None:
        return JsonResponse({"localizacao": None})

    historico = [
        {
            "latitude": ponto.latitude,
            "longitude": ponto.longitude,
            "timestamp": ponto.timestamp.isoformat(),
        }
        for ponto in rastreador.localizacoes.order_by("-timestamp")[:20]
    ]
    historico.reverse()

    return JsonResponse({
        "rastreador": {
            "id": rastreador.id,
            "identificador": rastreador.identificador,
            "pet": rastreador.pet.nome,
        },
        "localizacao": _localizacao_payload(localizacao),
        "historico": historico,
    })


@csrf_exempt
@require_POST
def registrar_localizacao_api(request, identificador):
    rastreador = get_object_or_404(Rastreador, identificador=identificador)

    try:
        payload = json.loads(request.body.decode("utf-8"))
        latitude = float(payload["latitude"])
        longitude = float(payload["longitude"])
    except (KeyError, TypeError, ValueError, json.JSONDecodeError):
        return JsonResponse(
            {"erro": "Envie um JSON com latitude e longitude numericas."},
            status=400,
        )

    if not -90 <= latitude <= 90 or not -180 <= longitude <= 180:
        return JsonResponse(
            {"erro": "Latitude ou longitude fora da faixa permitida."},
            status=400,
        )

    localizacao = Localizacao.objects.create(
        rastreador=rastreador,
        latitude=latitude,
        longitude=longitude,
    )

    return JsonResponse(
        {
            "mensagem": "Localizacao registrada com sucesso.",
            "localizacao": _localizacao_payload(localizacao),
        },
        status=201,
    )
