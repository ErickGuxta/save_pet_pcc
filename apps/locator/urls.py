from django.urls import path

from . import views

app_name = "locator"

urlpatterns = [
    path("",                 views.index, name="index"),
    path("create/",          views.create, name="create"),
    path("api/rastreadores/<int:id>/ultima-localizacao/", views.ultima_localizacao_api, name="ultima_localizacao_api"),
    path("api/rastreadores/<str:identificador>/localizacoes/", views.registrar_localizacao_api, name="registrar_localizacao_api"),
    path("<int:id>/",        views.detail, name="detail"),
    path("<int:id>/edit/",   views.edit, name="edit"),
    path("<int:id>/delete/", views.delete, name="delete"),
]
