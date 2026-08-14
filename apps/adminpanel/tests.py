from datetime import date

from django.contrib.auth.models import User
from django.test import Client, TestCase
from django.urls import reverse

from apps.pets.models import Pet


class AdminPetManagementTests(TestCase):
    def setUp(self):
        self.admin = User.objects.create_superuser(
            username="admin",
            email="admin@example.com",
            password="senha-admin",
        )
        self.tutor = User.objects.create_user(
            username="tutor",
            email="tutor@example.com",
            password="senha-tutor",
        )
        self.pet = Pet.objects.create(
            nome="Thor",
            especie="Cachorro",
            sexo="Macho",
            raca="Labrador",
            data_nascimento=date(2021, 3, 12),
            pelagem="Curta",
            peso="28.50",
            usuario=self.tutor,
        )

    def test_admin_lista_pets_de_outros_usuarios(self):
        client = Client()
        client.force_login(self.admin)

        response = client.get(reverse("admin_pets"))

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Thor")
        self.assertContains(response, "tutor")
        self.assertContains(response, "Ver")
        self.assertContains(response, "Editar")
        self.assertContains(response, "Excluir")

    def test_usuario_comum_nao_acessa_listagem_admin_de_pets(self):
        client = Client()
        client.force_login(self.tutor)

        response = client.get(reverse("admin_pets"))

        self.assertEqual(response.status_code, 302)

    def test_admin_edita_pet_de_outro_usuario(self):
        client = Client()
        client.force_login(self.admin)

        response = client.post(
            reverse("admin_pet_edit", args=[self.pet.id]),
            data={
                "usuario": self.tutor.id,
                "nome": "Thor Atualizado",
                "especie": "Cachorro",
                "sexo": "Macho",
                "raca": "Labrador",
                "data_nascimento": "12/03/2021",
                "pelagem": "Curta caramelo",
                "peso": "29.00",
                "alergias": "",
                "doencas": "",
                "medicamentos": "",
                "observacoes": "Atualizado pelo painel admin.",
            },
        )

        self.assertEqual(response.status_code, 302)
        self.pet.refresh_from_db()
        self.assertEqual(self.pet.nome, "Thor Atualizado")
        self.assertEqual(str(self.pet.peso), "29.00")

    def test_admin_visualiza_detalhe_de_pet_de_outro_usuario(self):
        client = Client()
        client.force_login(self.admin)

        response = client.get(reverse("admin_pet_detail", args=[self.pet.id]))

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Thor")
        self.assertContains(response, "Tutor: tutor")

    def test_admin_exclui_pet_de_outro_usuario(self):
        client = Client()
        client.force_login(self.admin)

        response = client.post(reverse("admin_pet_delete", args=[self.pet.id]))

        self.assertEqual(response.status_code, 302)
        self.assertFalse(Pet.objects.filter(id=self.pet.id).exists())
