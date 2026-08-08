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

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        for field in self.fields.values():
            field.widget.attrs.update({"class": "form-control"})

        for field_name in ["especie", "sexo"]:
            self.fields[field_name].widget.attrs.update({"class": "form-select"})

        self.fields["data_nascimento"].widget.input_type = "date"
