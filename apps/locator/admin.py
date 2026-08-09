from django.contrib import admin

from .models import Localizacao, Rastreador


admin.site.register(Rastreador)
admin.site.register(Localizacao)
