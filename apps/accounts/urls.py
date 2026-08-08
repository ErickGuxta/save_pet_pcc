from django.urls import path

from . import views

app_name = "accounts"

urlpatterns = [
    # Dashboard
    path("",                          views.index,     name="index"),
    path("home/",                     views.dashboard, name="dashboard"),

    # Cadastro público
    path("create/",                   views.create,    name="create"),
    path("register/",                 views.create,    name="register"),
    path("vacinas/",                  views.vaccines,  name="vaccines"),
    path("localizador/",              views.locator,   name="locator"),

    # Perfil do tutor
    path("perfil/",                   views.profile,   name="profile"),

    # Administração de usuários
    path("usuarios/",                 views.users,     name="users"),
    path("usuarios/<int:id>/",        views.detail,    name="detail"),
    path("usuarios/<int:id>/edit/",   views.edit,      name="edit"),
    path("usuarios/<int:id>/delete/", views.delete,    name="delete"),
  ]
