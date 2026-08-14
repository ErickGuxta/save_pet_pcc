from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="admin_panel"),
    path("pets/", views.pets, name="admin_pets"),
    path("pets/<int:id>/", views.pet_detail, name="admin_pet_detail"),
    path("pets/<int:id>/edit/", views.pet_edit, name="admin_pet_edit"),
    path("pets/<int:id>/delete/", views.pet_delete, name="admin_pet_delete"),
]
