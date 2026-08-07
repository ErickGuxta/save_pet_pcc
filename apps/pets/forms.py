from django import forms

#importar model de pets
from apps.pets.models import Pet


class PetForm(forms.ModelForm):
    class Meta:
        model = Pet
        fields = [
            "nome",
            "especie",
            "raca",
            "sexo",
            "data_nascimento",
            "pelagem",
            "peso",
            "foto",
            "alergias",
            "doencas",
            "medicamentos",
            "observacoes",
    ]