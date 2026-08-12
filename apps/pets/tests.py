from datetime import timedelta

from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from django.utils import timezone

from apps.vaccines.models import Vaccine

from .models import Pet


class PetExperienceTests(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(
            username="tutor",
            email="tutor@example.com",
            password="pass12345",
        )
        self.pet = Pet.objects.create(
            usuario=self.user,
            nome="Nina",
            especie="Gato",
            sexo="Fêmea",
            raca="SRD",
            data_nascimento=timezone.localdate(),
            pelagem="Cinza",
            peso=4.2,
        )
        self.client.force_login(self.user)

    def test_dashboard_renders_pet_status_indicators(self):
        Vaccine.objects.create(
            usuario=self.user,
            pet=self.pet,
            nome="V10",
            lote="A123",
            data_aplicacao=timezone.localdate(),
            data_reforco=timezone.localdate() + timedelta(days=10),
            veterinario="Dra. Ana",
            clinica="Clínica Central",
        )

        response = self.client.get(reverse("dashboard"))

        self.assertContains(response, "Reforço próximo")
        self.assertContains(response, "Sem rastreador")

    def test_pet_detail_renders_timeline(self):
        Vaccine.objects.create(
            usuario=self.user,
            pet=self.pet,
            nome="Antirrábica",
            lote="B456",
            data_aplicacao=timezone.localdate(),
            veterinario="Dr. Bruno",
            clinica="Clínica Pet",
        )

        response = self.client.get(reverse("pets:detail", args=[self.pet.id]))

        self.assertContains(response, "Linha do tempo")
        self.assertContains(response, "Vacina aplicada: Antirrábica")
