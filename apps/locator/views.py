from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404, redirect, render

from .forms import LocalizacaoForm, RastreadorForm
from .models import Rastreador


@login_required
def index(request):
    rastreadores = (
        Rastreador.objects.filter(pet__usuario=request.user)
        .select_related("pet")
        .prefetch_related("localizacoes")
    )
    form = RastreadorForm(user=request.user)

    if request.method == "POST":
        form = RastreadorForm(request.POST, user=request.user)

        if form.is_valid():
            form.save()
            messages.success(request, "Rastreador vinculado com sucesso.")
            return redirect("locator:index")

    context = {
        "rastreadores": rastreadores,
        "form": form,
    }

    return render(request, "locator/index.html", context)


@login_required
def detail(request, id):
    rastreador = get_object_or_404(
        Rastreador.objects.select_related("pet"),
        id=id,
        pet__usuario=request.user,
    )
    localizacoes = rastreador.localizacoes.all()
    form = LocalizacaoForm()

    if request.method == "POST":
        form = LocalizacaoForm(request.POST)

        if form.is_valid():
            localizacao = form.save(commit=False)
            localizacao.rastreador = rastreador
            localizacao.save()
            messages.success(request, "Localizacao registrada com sucesso.")
            return redirect("locator:detail", id=rastreador.id)

    context = {
        "rastreador": rastreador,
        "localizacoes": localizacoes,
        "ultima_localizacao": rastreador.ultima_localizacao,
        "form": form,
    }

    return render(request, "locator/detail.html", context)


@login_required
def create(request):
    form = RastreadorForm(user=request.user)

    if request.method == "POST":
        form = RastreadorForm(request.POST, user=request.user)

        if form.is_valid():
            form.save()
            messages.success(request, "Rastreador vinculado com sucesso.")
            return redirect("locator:index")
        else:
            context = {
                "form": form,
            }
            return render(request, "locator/create.html", context)

    context = {
        "form": form,
    }

    return render(request, "locator/create.html", context)


@login_required
def edit(request, id):
    rastreador = get_object_or_404(Rastreador, id=id, pet__usuario=request.user)
    form = RastreadorForm(instance=rastreador, user=request.user)

    if request.method == "POST":
        form = RastreadorForm(request.POST, instance=rastreador, user=request.user)

        if form.is_valid():
            form.save()
            messages.success(request, "Rastreador atualizado com sucesso.")
            return redirect("locator:index")
        else:
            context = {
                "form": form,
            }
            return render(request, "locator/edit.html", context)

    context = {
        "form": form,
    }

    return render(request, "locator/edit.html", context)


@login_required
def delete(request, id):
    rastreador = get_object_or_404(Rastreador, id=id, pet__usuario=request.user)
    rastreador.delete()
    messages.success(request, "Rastreador excluido com sucesso.")
    return redirect("locator:index")
