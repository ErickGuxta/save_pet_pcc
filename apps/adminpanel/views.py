from datetime import timedelta

from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required, user_passes_test
from django.shortcuts import render
from django.utils import timezone

from apps.blog.models import ArtigoBlog, Categoria
from apps.locator.models import Localizacao, Rastreador
from apps.pets.models import Pet
from apps.vaccines.models import Vaccine

User = get_user_model()


def is_admin(user):
    return user.is_superuser


@login_required
@user_passes_test(is_admin)
def index(request):
    today = timezone.localdate()
    next_month = today + timedelta(days=30)

    users = User.objects.all().order_by("-date_joined")
    pets = Pet.objects.select_related("usuario").all()
    vaccines = Vaccine.objects.select_related("pet", "usuario").all()
    trackers = Rastreador.objects.select_related("pet", "pet__usuario").all()
    locations = Localizacao.objects.select_related("rastreador", "rastreador__pet").all()[:8]
    categories = Categoria.objects.all()
    articles = ArtigoBlog.objects.select_related("categoria", "usuario").all()
    article_search = request.GET.get("article_q", "").strip()
    article_status = request.GET.get("article_status", "todos")
    article_category = request.GET.get("article_category", "todos")

    filtered_articles = articles
    if article_search:
        filtered_articles = filtered_articles.filter(titulo__icontains=article_search)
    if article_status != "todos":
        filtered_articles = filtered_articles.filter(status=article_status)
    if article_category != "todos":
        filtered_articles = filtered_articles.filter(categoria__slug=article_category)

    draft_articles = articles.filter(status=ArtigoBlog.STATUS_RASCUNHO)
    upcoming_vaccines = vaccines.filter(
        data_reforco__isnull=False,
        data_reforco__gte=today,
        data_reforco__lte=next_month,
    ).order_by("data_reforco")

    context = {
        "users": users[:8],
        "recent_users": users[:5],
        "pets": pets[:8],
        "vaccines": vaccines[:8],
        "trackers": trackers[:8],
        "locations": locations,
        "categories": categories[:8],
        "articles": filtered_articles[:8],
        "draft_articles": draft_articles[:5],
        "upcoming_vaccines": upcoming_vaccines[:5],
        "total_users": users.count(),
        "total_active_users": users.filter(is_active=True).count(),
        "total_inactive_users": users.filter(is_active=False).count(),
        "total_pets": pets.count(),
        "total_vaccines": vaccines.count(),
        "total_trackers": trackers.count(),
        "total_locations": Localizacao.objects.count(),
        "total_categories": categories.count(),
        "total_articles": articles.count(),
        "total_draft_articles": draft_articles.count(),
        "total_published_articles": articles.filter(status=ArtigoBlog.STATUS_PUBLICADO).count(),
        "total_upcoming_vaccines": upcoming_vaccines.count(),
        "article_search": article_search,
        "article_status": article_status,
        "article_category": article_category,
    }
    return render(request, "adminpanel/index.html", context)
