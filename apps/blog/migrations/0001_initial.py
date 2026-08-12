from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


def seed_blog(apps, schema_editor):
    User = apps.get_model("auth", "User")
    Categoria = apps.get_model("blog", "Categoria")
    ArtigoBlog = apps.get_model("blog", "ArtigoBlog")

    user = User.objects.filter(is_superuser=True).first() or User.objects.first()
    if user is None:
        user = User.objects.create(
            username="admin_blog",
            email="admin_blog@savepet.local",
            password="!",
            is_staff=True,
            is_active=False,
            is_superuser=True,
        )

    categories = {
        "Saúde": "Cuidados preventivos, sinais de alerta e acompanhamento veterinário.",
        "Nutrição": "Alimentação adequada para cada espécie e fase da vida.",
        "Bem-estar": "Rotina, enriquecimento ambiental e qualidade de vida.",
        "Comportamento": "Leitura corporal, adaptação e socialização.",
        "Dicas": "Guias práticos para tutores no dia a dia.",
    }

    category_objs = {}
    for name, description in categories.items():
        category_objs[name], _ = Categoria.objects.get_or_create(
            nome=name,
            defaults={"descricao": description, "slug": name.lower().replace("ç", "c").replace("ú", "u").replace("ã", "a").replace("é", "e").replace(" ", "-")},
        )

    articles = [
        {
            "categoria": "Saúde",
            "titulo": "Vacinação em cães: calendário completo por faixa etária",
            "slug": "vacinacao-em-caes-calendario-completo",
            "resumo": "Entenda quais vacinas são essenciais, quando aplicar cada dose e como controlar reforços anuais.",
            "imagem_url": "https://images.unsplash.com/photo-1770836037289-e00e5f351d11?w=900&h=520&fit=crop&auto=format",
            "tempo_leitura": 5,
            "conteudo": "A vacinação é uma das formas mais eficazes de proteger a saúde do seu cão. Por meio das vacinas, o organismo desenvolve defesas contra doenças graves, muitas delas potencialmente fatais.\n\nFilhotes precisam completar o esquema básico antes de ter contato frequente com outros animais ou frequentar locais públicos. Em geral, o calendário começa entre seis e oito semanas de vida, com reforços orientados pelo médico veterinário.\n\nDepois do protocolo inicial, cães adultos precisam de reforços periódicos. Registre cada aplicação, lote, clínica e data de reforço para manter o cuidado organizado.",
        },
        {
            "categoria": "Nutrição",
            "titulo": "A dieta ideal para gatos em todas as fases da vida",
            "slug": "dieta-ideal-para-gatos",
            "resumo": "Veja como idade, peso, hidratação e rotina influenciam a alimentação dos felinos.",
            "imagem_url": "https://images.unsplash.com/photo-1562874855-988ba2330251?w=900&h=520&fit=crop&auto=format",
            "tempo_leitura": 7,
            "conteudo": "Gatos têm necessidades nutricionais específicas e dependem de uma dieta rica em proteínas de boa qualidade. A escolha do alimento deve considerar idade, peso, castração e possíveis condições clínicas.\n\nA hidratação também merece atenção. Muitos felinos bebem pouca água, então fontes, sachês e orientação veterinária podem ajudar a prevenir problemas urinários.\n\nMudanças alimentares devem ser graduais para evitar desconfortos gastrointestinais.",
        },
        {
            "categoria": "Bem-estar",
            "titulo": "Como manter seu cão ativo e feliz durante o inverno",
            "slug": "cao-ativo-e-feliz-no-inverno",
            "resumo": "Atividades simples ajudam a manter gasto de energia, vínculo e saúde mesmo em dias frios.",
            "imagem_url": "https://images.unsplash.com/photo-1715475160658-39c34218fb84?w=900&h=520&fit=crop&auto=format",
            "tempo_leitura": 4,
            "conteudo": "No inverno, muitos cães reduzem a atividade física, mas ainda precisam de estímulos diários. Passeios curtos, brincadeiras dentro de casa e enriquecimento ambiental ajudam a manter o bem-estar.\n\nAnimais idosos, filhotes e cães de pelo curto podem precisar de proteção extra contra frio e umidade.\n\nObserve sinais de dor, apatia ou tosse persistente e procure orientação veterinária quando necessário.",
        },
    ]

    for data in articles:
        ArtigoBlog.objects.get_or_create(
            slug=data["slug"],
            defaults={
                "usuario": user,
                "categoria": category_objs[data["categoria"]],
                "titulo": data["titulo"],
                "resumo": data["resumo"],
                "conteudo": data["conteudo"],
                "imagem_url": data["imagem_url"],
                "tempo_leitura": data["tempo_leitura"],
                "status": "publicado",
            },
        )


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Categoria",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("nome", models.CharField(max_length=100, unique=True)),
                ("descricao", models.TextField(blank=True)),
                ("slug", models.SlugField(blank=True, max_length=120, unique=True)),
            ],
            options={
                "verbose_name": "Categoria",
                "verbose_name_plural": "Categorias",
                "ordering": ["nome"],
            },
        ),
        migrations.CreateModel(
            name="ArtigoBlog",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("titulo", models.CharField(max_length=180)),
                ("slug", models.SlugField(blank=True, max_length=210, unique=True)),
                ("resumo", models.TextField(blank=True)),
                ("conteudo", models.TextField()),
                ("imagem_url", models.URLField(blank=True, verbose_name="URL da imagem")),
                ("tempo_leitura", models.PositiveIntegerField(default=5, verbose_name="Tempo de leitura em minutos")),
                ("status", models.CharField(choices=[("rascunho", "Rascunho"), ("publicado", "Publicado")], default="publicado", max_length=20)),
                ("data_publicacao", models.DateTimeField(default=django.utils.timezone.now)),
                ("data_atualizacao", models.DateTimeField(auto_now=True)),
                ("categoria", models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name="artigos", to="blog.categoria")),
                ("usuario", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="artigos_blog", to=settings.AUTH_USER_MODEL)),
            ],
            options={
                "verbose_name": "Artigo do Blog",
                "verbose_name_plural": "Artigos do Blog",
                "ordering": ["-data_publicacao"],
            },
        ),
        migrations.RunPython(seed_blog, migrations.RunPython.noop),
    ]
