from django.contrib import admin
from django.urls    import path, include
from django.conf import settings
from django.conf.urls.static import static

from apps.accounts  import views
from apps.blog import views as blog_views

urlpatterns = [
    path('admin/'           , admin.site.urls),

    path(''                 , views.dashboard, name="dashboard"),
    path('painel-admin/'    , blog_views.admin_panel, name="admin_panel"),
    path('access/'          , include("django.contrib.auth.urls")),

    path('users/'           , include("apps.accounts.urls")),
    path('pets/'            , include("apps.pets.urls")),
    path('vaccines/'        , include("apps.vaccines.urls")),
    path('locator/'         , include("apps.locator.urls")),
    path('blog/'            , include("apps.blog.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
