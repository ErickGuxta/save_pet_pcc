from django.urls import path

from . import views

app_name = "accounts"

urlpatterns = [
    # Dashboard
    path("",                          views.index,     name="index"),
    path("home/",                     views.dashboard, name="dashboard"),

    # Cadastro público
    path("register/",                 views.register,  name="register"),

    # Perfil do tutor
    path("perfil/",                   views.profile,   name="profile"),

    # Administração de usuários
    path("usuarios/",                 views.users,     name="users"),
    path("usuarios/<int:id>/",        views.detail,    name="detail"),
    path("usuarios/<int:id>/edit/",   views.edit,      name="edit"),
    path("usuarios/<int:id>/delete/", views.delete,    name="delete"),
  ]
