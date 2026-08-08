# // O app accounts deve cuidar:

#   - cadastro/login/logout de usuários;
#   - perfil do tutor;
#   - CRUD administrativo de usuários;
#   - regras de permissão relacionadas a usuário.

# ============================================================
# Imports
# ============================================================

#importando shortcuts para renderização e redirecionamento de URL
from django.shortcuts import render, get_object_or_404, redirect

#importando User padrão do django; biblioteca de login_required e user_passes_test para acesso restrito a usuários
from django.contrib.auth import get_user_model, login
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib import messages

from .forms import PerfilUsuarioForm, UserForm
from .models import Usuario

User = get_user_model()

# ============================================================
# Permissões de acesso
# ============================================================

def is_admin(user):
    return user.is_superuser

# ============================================================
# Dashboard
# ============================================================

@login_required
def dashboard(request):
    return render(request, "accounts/dashboard.html")


@login_required
def index(request):
    return redirect("dashboard")


@login_required
def vaccines(request):
    return render(request, "accounts/vaccines.html")


@login_required
def locator(request):
    return render(request, "accounts/locator.html")

# ============================================================
# Cadastro público de tutor
# ============================================================
def create(request):
    #instanciando a metaclasse UserForm
    form = UserForm()

    if request.method == "POST":
        form = UserForm(request.POST)

        if form.is_valid():
            user = form.save()
            Usuario.objects.get_or_create(user=user)
            login(request, user)

            messages.success(request, "Cadastro realizado com sucesso.")

            return redirect("dashboard")
        #se não for válido renderiza a tela de criar novamente
        else:
            context = {
                "form": form
            }
            return render(request, "accounts/create.html", context)

    context = {
        "form": form
    }

    return render(request, "accounts/create.html", context)


# ============================================================
# Perfil do tutor
# ============================================================
@login_required
def profile(request):
    Usuario.objects.get_or_create(user=request.user)
    form = PerfilUsuarioForm(user=request.user)

    if request.method == "POST":
        form = PerfilUsuarioForm(request.POST, user=request.user)
        if form.is_valid():
            user = request.user
            perfil = user.perfil

            user.first_name = form.cleaned_data["nome"]
            user.email = form.cleaned_data["email"]
            user.save()

            perfil.cpf         = form.cleaned_data["cpf"] or None
            perfil.telefone    = form.cleaned_data["telefone"]
            perfil.cep         = form.cleaned_data["cep"]
            perfil.logradouro  = form.cleaned_data["logradouro"]
            perfil.numero      = form.cleaned_data["numero"]
            perfil.complemento = form.cleaned_data["complemento"]
            perfil.bairro      = form.cleaned_data["bairro"]
            perfil.cidade      = form.cleaned_data["cidade"]
            perfil.estado      = form.cleaned_data["estado"]
            perfil.save()

            messages.success(request, "Perfil atualizado.")
            return redirect("accounts:profile")
        else:
            context = {
                "form": form
            }
            return render(request, "accounts/profile.html", context)

    context = {
        "form": form
    }

    return render(request, "accounts/profile.html", context)


# ============================================================
# Administração de usuários
# ============================================================

#Listar users
@login_required
@user_passes_test(is_admin)
def users(request):

    users = User.objects.all()

    context = {
        "users": users,
    }

    #retorno a request, o caminho template e o contexto
    return render(request, "accounts/index.html", context)

#detalhar users
@login_required
@user_passes_test(is_admin)
def detail(request, id):
    #retornar user por ID pegando pelo get
    user = get_object_or_404(User, id=id)

    context = {
        "user": user
    }

    return render(request, "accounts/detail.html", context)


#Editar users 
@login_required
@user_passes_test(is_admin)
def edit(request, id):

    user = get_object_or_404(User, id=id)
    form = UserForm(instance=user)

    if request.method == "POST":
        #instancia o UserForm, tendo como parametro: request via POST e a instância do user
        form = UserForm(request.POST, instance=user)

        if form.is_valid():
            form.save()
            return redirect("accounts:users")
        else:
            context = {
                "is_edit": True,
                "form": form,
                "user": user
            }
            return render(request, "accounts/edit.html", context)

    context = {
        "is_edit": True,
        "form": form,
        "user": user
    }

    return render(request, "accounts/edit.html", context)


#Deletar users 
@login_required 
@user_passes_test(is_admin)
def delete(request, id):

    user = get_object_or_404(User, id=id)

    if request.method == "POST":
        user.delete()
        return redirect("accounts:users")

    context = {
        "delete_user": user
    }

    return render(request, "accounts/delete.html", context)
