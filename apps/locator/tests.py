import json
from datetime import date, timedelta

from django.contrib.auth.models import User
from django.test import Client, TestCase
from django.urls import reverse
from django.utils import timezone

from apps.locator.models import Localizacao, Rastreador
from apps.pets.models import Pet


class LocalizacaoApiTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="tutor",
            email="tutor@example.com",
            password="senha-teste",
        )
        self.pet = Pet.objects.create(
            nome="Bolt",
            especie="Cachorro",
            sexo="Macho",
            raca="SRD",
            data_nascimento=date(2022, 1, 1),
            pelagem="Curta",
            peso="12.50",
            usuario=self.user,
        )
        self.rastreador = Rastreador.objects.create(
            pet=self.pet,
            identificador="COL-001",
            modelo="Coleira simulada",
        )

    def test_registra_localizacao_por_identificador(self):
        response = self.client.post(
            reverse("locator:registrar_localizacao_api", args=["COL-001"]),
            data=json.dumps({"latitude": -12.9777, "longitude": -38.5016}),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(Localizacao.objects.count(), 1)
        localizacao = Localizacao.objects.get()
        self.assertEqual(localizacao.rastreador, self.rastreador)
        self.assertEqual(localizacao.latitude, -12.9777)
        self.assertEqual(localizacao.longitude, -38.5016)

    def test_ultima_localizacao_exige_login(self):
        response = self.client.get(
            reverse("locator:ultima_localizacao_api", args=[self.rastreador.id])
        )

        self.assertEqual(response.status_code, 302)

    def test_retorna_ultima_localizacao_do_usuario_logado(self):
        agora = timezone.now()
        Localizacao.objects.create(
            rastreador=self.rastreador,
            latitude=-12.9777,
            longitude=-38.5016,
            timestamp=agora,
        )
        Localizacao.objects.create(
            rastreador=self.rastreador,
            latitude=-12.9781,
            longitude=-38.5020,
            timestamp=agora + timedelta(seconds=10),
        )
        client = Client()
        client.force_login(self.user)

        response = client.get(
            reverse("locator:ultima_localizacao_api", args=[self.rastreador.id])
        )

        self.assertEqual(response.status_code, 200)
        payload = response.json()
        self.assertEqual(payload["localizacao"]["latitude"], -12.9781)
        self.assertEqual(len(payload["historico"]), 2)

    def test_index_renderiza_mapa_com_seletor_de_pet(self):
        Localizacao.objects.create(
            rastreador=self.rastreador,
            latitude=-12.9777,
            longitude=-38.5016,
        )
        client = Client()
        client.force_login(self.user)

        response = client.get(reverse("locator:index"))

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'id="tracker-select"')
        self.assertContains(response, 'id="locator-index-map"')
        self.assertContains(response, "Bolt - COL-001")
