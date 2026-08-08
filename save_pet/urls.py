from django.contrib import admin
from django.urls import path, include

from apps.accounts import views
from apps.pets import views as pet_views

urlpatterns = [
    path('admin/'           , admin.site.urls),

    path(''                 , views.dashboard, name="dashboard"),
    path('access/'          , include("django.contrib.auth.urls")),
    path('users/'           , include("apps.accounts.urls")),
    path('pets/'            , include("apps.pets.urls")),
]
