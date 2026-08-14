import random
import time

from django.core.management.base import BaseCommand, CommandError

from apps.locator.models import Localizacao, Rastreador


class Command(BaseCommand):
    help = "Gera coordenadas simuladas para um rastreador."

    def add_arguments(self, parser):
        parser.add_argument("identificador", help="Identificador do rastreador.")
        parser.add_argument(
            "--intervalo",
            type=float,
            default=3,
            help="Intervalo em segundos entre os pontos. Padrao: 3.",
        )
        parser.add_argument(
            "--pontos",
            type=int,
            default=0,
            help="Quantidade de pontos a gerar. Use 0 para rodar ate interromper.",
        )
        parser.add_argument(
            "--latitude",
            type=float,
            default=None,
            help="Latitude inicial quando o rastreador ainda nao tem localizacao.",
        )
        parser.add_argument(
            "--longitude",
            type=float,
            default=None,
            help="Longitude inicial quando o rastreador ainda nao tem localizacao.",
        )
        parser.add_argument(
            "--passo",
            type=float,
            default=0.00045,
            help="Variacao maxima por ponto em graus. Padrao: 0.00045.",
        )

    def handle(self, *args, **options):
        identificador = options["identificador"]
        intervalo = options["intervalo"]
        total_pontos = options["pontos"]
        passo = options["passo"]

        if intervalo <= 0:
            raise CommandError("O intervalo deve ser maior que zero.")
        if total_pontos < 0:
            raise CommandError("A quantidade de pontos nao pode ser negativa.")
        if passo <= 0:
            raise CommandError("O passo deve ser maior que zero.")

        try:
            rastreador = Rastreador.objects.select_related("pet").get(
                identificador=identificador,
            )
        except Rastreador.DoesNotExist as exc:
            raise CommandError(
                f"Nenhum rastreador encontrado com identificador '{identificador}'."
            ) from exc

        ultima = rastreador.ultima_localizacao
        latitude = options["latitude"]
        longitude = options["longitude"]

        if ultima:
            latitude = ultima.latitude if latitude is None else latitude
            longitude = ultima.longitude if longitude is None else longitude
        else:
            latitude = -14.2231 if latitude is None else latitude
            longitude = -42.7799 if longitude is None else longitude

        self.stdout.write(
            self.style.SUCCESS(
                f"Simulando {rastreador.identificador} ({rastreador.pet.nome}). "
                "Use Ctrl+C para parar."
            )
        )

        gerados = 0
        try:
            while total_pontos == 0 or gerados < total_pontos:
                latitude = self._limitar(latitude + random.uniform(-passo, passo), -90, 90)
                longitude = self._limitar(longitude + random.uniform(-passo, passo), -180, 180)

                localizacao = Localizacao.objects.create(
                    rastreador=rastreador,
                    latitude=round(latitude, 7),
                    longitude=round(longitude, 7),
                )
                gerados += 1

                self.stdout.write(
                    f"[{gerados}] {localizacao.timestamp:%d/%m/%Y %H:%M:%S} "
                    f"lat={localizacao.latitude} lng={localizacao.longitude}"
                )

                if total_pontos and gerados >= total_pontos:
                    break

                time.sleep(intervalo)
        except KeyboardInterrupt:
            self.stdout.write("")
            self.stdout.write(self.style.WARNING("Simulacao interrompida."))

    def _limitar(self, valor, minimo, maximo):
        return max(minimo, min(maximo, valor))
