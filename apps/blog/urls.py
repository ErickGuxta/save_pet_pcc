from django.urls import path

from . import views

app_name = "blog"

urlpatterns = [
    path("", views.blog, name="index"),
    path("categorias/create/", views.category_create, name="category_create"),
    path("categorias/<int:id>/edit/", views.category_edit, name="category_edit"),
    path("categorias/<int:id>/delete/", views.category_delete, name="category_delete"),
    path("artigos/create/", views.article_create, name="article_create"),
    path("artigos/<int:id>/edit/", views.article_edit, name="article_edit"),
    path("artigos/<int:id>/delete/", views.article_delete, name="article_delete"),
    path("<slug:slug>/", views.article_detail, name="detail"),
]
