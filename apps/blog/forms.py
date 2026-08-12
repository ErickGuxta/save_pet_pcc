from django import forms

from .models import ArtigoBlog, Categoria


class CategoriaForm(forms.ModelForm):
    class Meta:
        model = Categoria
        fields = ["nome", "descricao"]
        widgets = {
            "nome": forms.TextInput(attrs={"class": "form-control"}),
            "descricao": forms.Textarea(attrs={"class": "form-control", "rows": 3}),
        }


class ArtigoBlogForm(forms.ModelForm):
    class Meta:
        model = ArtigoBlog
        fields = [
            "categoria",
            "titulo",
            "resumo",
            "conteudo",
            "imagem_url",
            "tempo_leitura",
            "status",
            "data_publicacao",
        ]
        widgets = {
            "categoria": forms.Select(attrs={"class": "form-select"}),
            "titulo": forms.TextInput(attrs={"class": "form-control"}),
            "resumo": forms.Textarea(attrs={"class": "form-control", "rows": 3}),
            "conteudo": forms.Textarea(attrs={"class": "form-control", "rows": 10}),
            "imagem_url": forms.URLInput(attrs={"class": "form-control"}),
            "tempo_leitura": forms.NumberInput(attrs={"class": "form-control", "min": 1}),
            "status": forms.Select(attrs={"class": "form-select"}),
            "data_publicacao": forms.DateTimeInput(
                attrs={"class": "form-control", "type": "datetime-local"},
                format="%Y-%m-%dT%H:%M",
            ),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["data_publicacao"].input_formats = ["%Y-%m-%dT%H:%M"]
