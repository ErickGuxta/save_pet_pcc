from django import forms
from django.db.models import Q

from apps.locator.models import Localizacao, Rastreador
from apps.pets.models import Pet


class RastreadorForm(forms.ModelForm):
    class Meta:
        model = Rastreador
        fields = [
            "pet",
            "identificador",
            "modelo",
            "data_vinculacao",
        ]
        widgets = {
            "data_vinculacao": forms.DateTimeInput(
                attrs={
                    "class": "form-control datetime-br-input",
                    "data-datetime-br": "true",
                    "inputmode": "numeric",
                    "maxlength": "16",
                    "pattern": r"\d{2}/\d{2}/\d{4} \d{2}:\d{2}",
                    "placeholder": "dd/mm/aaaa hh:mm",
                    "autocomplete": "off",
                },
                format="%d/%m/%Y %H:%M",
            )
        }

    def __init__(self, *args, **kwargs):
        user = kwargs.pop("user", None)
        super().__init__(*args, **kwargs)

        if user is not None:
            pets = Pet.objects.filter(usuario=user)
            if self.instance.pk:
                pets = pets.filter(
                    Q(rastreador__isnull=True) | Q(pk=self.instance.pet_id)
                )
            else:
                pets = pets.filter(rastreador__isnull=True)
            self.fields["pet"].queryset = pets

        for field in self.fields.values():
            field.widget.attrs.update({"class": "form-control"})

        self.fields["pet"].widget.attrs.update({"class": "form-select"})
        self.fields["data_vinculacao"].input_formats = ["%d/%m/%Y %H:%M", "%Y-%m-%dT%H:%M"]
        self.fields["data_vinculacao"].error_messages["invalid"] = "Informe data e hora no formato dd/mm/aaaa hh:mm."
        self.fields["data_vinculacao"].widget.attrs.update({
            "class": "form-control datetime-br-input",
            "data-datetime-br": "true",
            "inputmode": "numeric",
            "maxlength": "16",
            "pattern": r"\d{2}/\d{2}/\d{4} \d{2}:\d{2}",
            "placeholder": "dd/mm/aaaa hh:mm",
            "autocomplete": "off",
        })


class LocalizacaoForm(forms.ModelForm):
    class Meta:
        model = Localizacao
        fields = [
            "latitude",
            "longitude",
            "timestamp",
        ]
        widgets = {
            "timestamp": forms.DateTimeInput(
                attrs={
                    "class": "form-control datetime-br-input",
                    "data-datetime-br": "true",
                    "inputmode": "numeric",
                    "maxlength": "16",
                    "pattern": r"\d{2}/\d{2}/\d{4} \d{2}:\d{2}",
                    "placeholder": "dd/mm/aaaa hh:mm",
                    "autocomplete": "off",
                },
                format="%d/%m/%Y %H:%M",
            )
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        for field in self.fields.values():
            field.widget.attrs.update({"class": "form-control"})

        self.fields["timestamp"].input_formats = ["%d/%m/%Y %H:%M", "%Y-%m-%dT%H:%M"]
        self.fields["timestamp"].error_messages["invalid"] = "Informe data e hora no formato dd/mm/aaaa hh:mm."
        self.fields["timestamp"].widget.attrs.update({
            "class": "form-control datetime-br-input",
            "data-datetime-br": "true",
            "inputmode": "numeric",
            "maxlength": "16",
            "pattern": r"\d{2}/\d{2}/\d{4} \d{2}:\d{2}",
            "placeholder": "dd/mm/aaaa hh:mm",
            "autocomplete": "off",
        })
