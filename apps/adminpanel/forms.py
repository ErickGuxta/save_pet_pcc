from django import forms
from django.contrib.auth import get_user_model

from apps.pets.forms import PetForm
from apps.pets.models import Pet

User = get_user_model()


class AdminPetForm(PetForm):
    class Meta(PetForm.Meta):
        model = Pet
        fields = ["usuario", *PetForm.Meta.fields]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["usuario"].queryset = User.objects.order_by("username")
        self.fields["usuario"].label = "Tutor"
        self.fields["usuario"].widget.attrs.update({"class": "form-select"})
