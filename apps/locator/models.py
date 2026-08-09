from django.db import models
from django.utils import timezone

from apps.pets.models import Pet


class Rastreador(models.Model):
    pet = models.OneToOneField(
        Pet,
        on_delete=models.CASCADE,
        related_name="rastreador",
    )
    identificador = models.CharField(max_length=100, unique=True)
    modelo = models.CharField(max_length=100)
    data_vinculacao = models.DateTimeField(default=timezone.now)

    class Meta:
        verbose_name = "Rastreador"
        verbose_name_plural = "Rastreadores"

    def __str__(self):
        return f"{self.identificador} - {self.pet.nome}"

    @property
    def ultima_localizacao(self):
        return self.localizacoes.order_by("-timestamp").first()


class Localizacao(models.Model):
    rastreador = models.ForeignKey(
        Rastreador,
        on_delete=models.CASCADE,
        related_name="localizacoes",
    )
    latitude = models.FloatField()
    longitude = models.FloatField()
    timestamp = models.DateTimeField(default=timezone.now)

    class Meta:
        verbose_name = "Localizacao"
        verbose_name_plural = "Localizacoes"
        ordering = ["-timestamp"]

    def __str__(self):
        return f"{self.rastreador.identificador} ({self.latitude}, {self.longitude})"
