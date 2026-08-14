from django.contrib import messages
from django.contrib.auth.decorators import login_required, user_passes_test
from django.db.models import ProtectedError
from django.shortcuts import get_object_or_404, redirect, render

from .forms import ArtigoBlogForm, CategoriaForm
from .models import ArtigoBlog, Categoria


def is_admin(user):
    return user.is_superuser


def blog(request):
    categories = Categoria.objects.all()
    articles = ArtigoBlog.objects.filter(status=ArtigoBlog.STATUS_PUBLICADO).select_related(
        "categoria",
        "usuario",
    )
    selected_category = request.GET.get("categoria", "todos")
    search = request.GET.get("q", "").strip()

    if selected_category != "todos":
        articles = articles.filter(categoria__slug=selected_category)

    if search:
        articles = articles.filter(titulo__icontains=search)

    context = {
        "articles": articles,
        "categories": categories,
        "selected_category": selected_category,
        "search": search,
    }
    return render(request, "blog/index.html", context)


def article_detail(request, slug):
    article = get_object_or_404(
        ArtigoBlog.objects.select_related("categoria", "usuario"),
        slug=slug,
        status=ArtigoBlog.STATUS_PUBLICADO,
    )
    related = (
        ArtigoBlog.objects.filter(status=ArtigoBlog.STATUS_PUBLICADO, categoria=article.categoria)
        .exclude(id=article.id)
        .select_related("categoria")[:2]
    )
    context = {
        "article": article,
        "related": related,
    }
    return render(request, "blog/detail.html", context)


@login_required
@user_passes_test(is_admin)
def category_create(request):
    form = CategoriaForm(request.POST or None)
    if request.method == "POST" and form.is_valid():
        form.save()
        messages.success(request, "Categoria criada com sucesso.")
        return redirect("admin_panel")
    return render(request, "blog/category_form.html", {"form": form, "title": "Nova categoria"})


@login_required
@user_passes_test(is_admin)
def category_edit(request, id):
    category = get_object_or_404(Categoria, id=id)
    form = CategoriaForm(request.POST or None, instance=category)
    if request.method == "POST" and form.is_valid():
        form.save()
        messages.success(request, "Categoria atualizada com sucesso.")
        return redirect("admin_panel")
    return render(request, "blog/category_form.html", {"form": form, "title": "Editar categoria"})


@login_required
@user_passes_test(is_admin)
def category_delete(request, id):
    category = get_object_or_404(Categoria, id=id)
    if request.method == "POST":
        try:
            category.delete()
            messages.success(request, "Categoria excluída com sucesso.")
        except ProtectedError:
            messages.error(request, "Não é possível excluir uma categoria com artigos vinculados.")
        return redirect("admin_panel")
    return render(request, "blog/confirm_delete.html", {"object": category, "object_type": "categoria"})


@login_required
@user_passes_test(is_admin)
def article_preview(request, id):
    article = get_object_or_404(
        ArtigoBlog.objects.select_related("categoria", "usuario"),
        id=id,
    )
    related = (
        ArtigoBlog.objects.filter(status=ArtigoBlog.STATUS_PUBLICADO, categoria=article.categoria)
        .exclude(id=article.id)
        .select_related("categoria")[:2]
    )
    context = {
        "article": article,
        "related": related,
        "is_admin_preview": True,
    }
    return render(request, "blog/detail.html", context)


@login_required
@user_passes_test(is_admin)
def article_create(request):
    form = ArtigoBlogForm(request.POST or None)
    if request.method == "POST" and form.is_valid():
        article = _save_article_form(form, request)
        messages.success(request, _article_success_message(article, "criado"))
        return redirect("admin_panel")
    return render(request, "blog/article_form.html", {"form": form, "title": "Novo artigo"})


@login_required
@user_passes_test(is_admin)
def article_edit(request, id):
    article = get_object_or_404(ArtigoBlog, id=id)
    form = ArtigoBlogForm(request.POST or None, instance=article)
    if request.method == "POST" and form.is_valid():
        article = _save_article_form(form, request)
        messages.success(request, _article_success_message(article, "atualizado"))
        return redirect("admin_panel")
    return render(request, "blog/article_form.html", {"form": form, "title": "Editar artigo"})


def _save_article_form(form, request):
    article = form.save(commit=False)
    if not article.pk:
        article.usuario = request.user
    if request.POST.get("save_as") == "draft":
        article.status = ArtigoBlog.STATUS_RASCUNHO
    article.save()
    form.save_m2m()
    return article


def _article_success_message(article, action):
    if article.status == ArtigoBlog.STATUS_RASCUNHO:
        return f"Artigo {action} como rascunho."
    return f"Artigo {action} com sucesso."


@login_required
@user_passes_test(is_admin)
def article_delete(request, id):
    article = get_object_or_404(ArtigoBlog, id=id)
    if request.method == "POST":
        article.delete()
        messages.success(request, "Artigo excluído com sucesso.")
        return redirect("admin_panel")
    return render(request, "blog/confirm_delete.html", {"object": article, "object_type": "artigo"})
