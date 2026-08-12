from django import forms
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError

#importando User padrão Django e validações
# from django.contrib.auth.models import User

User = get_user_model()


class UserForm(forms.ModelForm):
    nome = forms.CharField(
        label="Nome",
        max_length=150,
        required=False,
        widget=forms.TextInput(attrs={"class": "form-control", "autocomplete": "off"}),
    )

    #metaclasse
    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "nome",
            "is_active",
            "is_staff",
            "is_superuser",
            "password",
        ]

        widgets = {
            "username": forms.TextInput(attrs={"class": "form-control", "autocomplete": "off"}),
            "email": forms.TextInput(attrs={"class": "form-control", "autocomplete": "off"}),
            "nome": forms.TextInput(attrs={"class": "form-control", "autocomplete": "off"}),
            "password": forms.PasswordInput(attrs={"class": "form-control", "autocomplete": "off"}),
            "is_active": forms.CheckboxInput(attrs={"class": "form-check-input"}),
            "is_staff": forms.CheckboxInput(attrs={"class": "form-check-input"}),
            "is_superuser": forms.CheckboxInput(attrs={"class": "form-check-input"}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        if self.instance and self.instance.pk:
            self.fields["nome"].initial = self.instance.first_name
            self.fields["password"].required = False
        else:
            self.fields["is_active"].initial = True

    #def para salvar senha
    def save(self, commit=True):
        old_password = None
        if self.instance and self.instance.pk:
            old_password = User.objects.only("password").get(pk=self.instance.pk).password

        user = super().save(commit=False)
        user.first_name = self.cleaned_data.get("nome", "")
        password = self.cleaned_data.get("password")

        if password:
            user.set_password(password)  # Salva a senha corretamente, com hash
        elif old_password:
            user.password = old_password

        if commit:
            user.save()
        return user


RegistroUsuarioForm = UserForm


class PublicUserForm(forms.ModelForm):
    nome = forms.CharField(
        label="Nome",
        max_length=150,
        required=True,
        widget=forms.TextInput(attrs={"class": "form-control", "autocomplete": "name"}),
    )
    password1 = forms.CharField(
        label="Senha",
        strip=False,
        widget=forms.PasswordInput(attrs={"class": "form-control", "autocomplete": "new-password"}),
    )
    password2 = forms.CharField(
        label="Confirmar senha",
        strip=False,
        widget=forms.PasswordInput(attrs={"class": "form-control", "autocomplete": "new-password"}),
    )

    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "nome",
        ]
        widgets = {
            "username": forms.TextInput(attrs={"class": "form-control", "autocomplete": "username"}),
            "email": forms.EmailInput(attrs={"class": "form-control", "autocomplete": "email"}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.order_fields(["nome", "username", "email", "password1", "password2"])

    def clean(self):
        cleaned_data = super().clean()
        password1 = cleaned_data.get("password1")
        password2 = cleaned_data.get("password2")

        if password1 and password2 and password1 != password2:
            self.add_error("password2", "As senhas não conferem.")

        if password1:
            try:
                validate_password(password1)
            except ValidationError as error:
                self.add_error("password1", error)

        return cleaned_data

    def save(self, commit=True):
        user = super().save(commit=False)
        user.first_name = self.cleaned_data.get("nome", "")
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user


class PerfilUsuarioForm(forms.Form):
    nome        = forms.CharField(label="Nome", max_length=150, required=False)
    email       = forms.EmailField(label="E-mail", required=False)
    cpf         = forms.CharField(label="CPF", max_length=14, required=False)
    telefone    = forms.CharField(label="Telefone", max_length=20, required=False)
    cep         = forms.CharField(label="CEP", max_length=9, required=False)
    logradouro  = forms.CharField(label="Logradouro", max_length=150, required=False)
    numero      = forms.CharField(label="Numero", max_length=20, required=False)
    complemento = forms.CharField(label="Complemento", max_length=100, required=False)
    bairro      = forms.CharField(label="Bairro", max_length=100, required=False)
    cidade      = forms.CharField(label="Cidade", max_length=100, required=False)
    estado      = forms.CharField(label="Estado", max_length=2, required=False)

    def __init__(self, *args, **kwargs):
        user = kwargs.pop("user", None)
        super().__init__(*args, **kwargs)

        for field in self.fields.values():
            field.widget.attrs.update({"class": "form-control"})

        if user:
            perfil = getattr(user, "perfil", None)
            self.initial.update(
                {
                    "nome": user.first_name,
                    "email": user.email,
                    "cpf": getattr(perfil, "cpf", "") or "",
                    "telefone": getattr(perfil, "telefone", ""),
                    "cep": getattr(perfil, "cep", ""),
                    "logradouro": getattr(perfil, "logradouro", ""),
                    "numero": getattr(perfil, "numero", ""),
                    "complemento": getattr(perfil, "complemento", ""),
                    "bairro": getattr(perfil, "bairro", ""),
                    "cidade": getattr(perfil, "cidade", ""),
                    "estado": getattr(perfil, "estado", ""),
                }
            )


class PerfilSenhaForm(PasswordChangeForm):
    old_password = forms.CharField(
        label="Senha atual",
        strip=False,
        widget=forms.PasswordInput(attrs={"class": "form-control", "autocomplete": "current-password"}),
    )
    new_password1 = forms.CharField(
        label="Nova senha",
        strip=False,
        widget=forms.PasswordInput(attrs={"class": "form-control", "autocomplete": "new-password"}),
    )
    new_password2 = forms.CharField(
        label="Confirmar nova senha",
        strip=False,
        widget=forms.PasswordInput(attrs={"class": "form-control", "autocomplete": "new-password"}),
    )
