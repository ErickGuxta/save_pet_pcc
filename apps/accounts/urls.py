from django.urls import path

from . import views

app_name = "accounts"

urlpatterns = [
    path("", views.index, name="index"),
    path("home/",            views.dashboard,      name="dashboard"),
    path("usuarios/",        views.users,          name="users"),
    path("create/",          views.create,         name="create"),
    path("register/",        views.create,         name="register"),
    path("perfil/",          views.profile,        name="profile"),
    path("pets/",            views.pets,           name="pets"),
    path("vacinas/",         views.vaccines,       name="vaccines"),
    path("localizador/",     views.locator,        name="locator"),
    path("<int:id>/",        views.detail,         name="detail"),
    path("<int:id>/edit/",   views.edit,           name="edit"),
    path("<int:id>/delete/", views.delete,         name="delete"),
]
