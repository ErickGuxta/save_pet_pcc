from django.contrib import admin

from .models import Usuario


@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin):
    list_display = ("user", "cpf", "telefone", "tipo", "cidade", "estado")
    list_filter = ("tipo", "estado", "cidade")
    search_fields = (
        "user__username",
        "user__first_name",
        "user__last_name",
        "user__email",
        "cpf",
        "telefone",
        "cidade",
    )
