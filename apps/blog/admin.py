from django.contrib import admin

from .models import ArtigoBlog, Categoria


@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ["nome", "slug"]
    prepopulated_fields = {"slug": ("nome",)}
    search_fields = ["nome", "descricao"]


@admin.register(ArtigoBlog)
class ArtigoBlogAdmin(admin.ModelAdmin):
    list_display = ["titulo", "categoria", "usuario", "status", "data_publicacao"]
    list_filter = ["status", "categoria"]
    prepopulated_fields = {"slug": ("titulo",)}
    search_fields = ["titulo", "resumo", "conteudo"]
