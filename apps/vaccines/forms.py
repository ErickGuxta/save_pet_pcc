from django import forms

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
            "pet"
        ]