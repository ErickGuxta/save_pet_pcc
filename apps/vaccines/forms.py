from django import forms

from apps.pets.models import Pet
from apps.vaccines.models import Vaccine


class VaccineForm(forms.ModelForm):
    class Meta:
        model = Vaccine
        fields = [
            "nome",
            "lote",
            "data_aplicacao",
            "data_reforco",
            "veterinario",
            "clinica",
            "observacoes",
            "pet",
        ]

    def __init__(self, *args, **kwargs):
        user = kwargs.pop("user", None)
        super().__init__(*args, **kwargs)

        if user is not None:
            self.fields["pet"].queryset = Pet.objects.filter(usuario=user)

        for field in self.fields.values():
            field.widget.attrs.update({"class": "form-control"})

        self.fields["pet"].widget.attrs.update({"class": "form-select"})
        self.fields["data_aplicacao"].widget.input_type = "date"
        self.fields["data_reforco"].widget.input_type = "date"
