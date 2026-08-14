from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from .models import ArtigoBlog, Categoria


class ArticleDraftSaveTests(TestCase):
    def setUp(self):
        self.admin = get_user_model().objects.create_superuser(
            username="admin",
            email="admin@example.com",
            password="adminpass123",
        )
        self.category, _ = Categoria.objects.get_or_create(nome="Saúde")
        self.client.force_login(self.admin)

    def article_payload(self, **overrides):
        payload = {
            "categoria": self.category.id,
            "titulo": "Cuidados com pets no verão",
            "resumo": "Resumo do artigo",
            "conteudo": "Conteúdo completo do artigo.",
            "imagem_url": "",
            "tempo_leitura": 4,
            "status": ArtigoBlog.STATUS_PUBLICADO,
            "data_publicacao": "12/08/2026 10:30",
        }
        payload.update(overrides)
        return payload

    def test_article_create_can_save_as_draft(self):
        response = self.client.post(
            reverse("blog:article_create"),
            self.article_payload(save_as="draft"),
        )

        self.assertRedirects(response, reverse("admin_panel"))
        article = ArtigoBlog.objects.get(titulo="Cuidados com pets no verão")
        self.assertEqual(article.status, ArtigoBlog.STATUS_RASCUNHO)
        self.assertEqual(article.usuario, self.admin)

    def test_article_edit_can_save_as_draft(self):
        article = ArtigoBlog.objects.create(
            usuario=self.admin,
            categoria=self.category,
            titulo="Artigo publicado",
            resumo="Resumo",
            conteudo="Conteúdo",
            tempo_leitura=3,
            status=ArtigoBlog.STATUS_PUBLICADO,
        )

        response = self.client.post(
            reverse("blog:article_edit", args=[article.id]),
            self.article_payload(titulo="Artigo revisado", save_as="draft"),
        )

        self.assertRedirects(response, reverse("admin_panel"))
        article.refresh_from_db()
        self.assertEqual(article.titulo, "Artigo revisado")
        self.assertEqual(article.status, ArtigoBlog.STATUS_RASCUNHO)

    def test_admin_can_preview_draft_article(self):
        article = ArtigoBlog.objects.create(
            usuario=self.admin,
            categoria=self.category,
            titulo="Rascunho interno",
            resumo="Resumo",
            conteudo="Conteúdo em revisão",
            tempo_leitura=3,
            status=ArtigoBlog.STATUS_RASCUNHO,
        )

        response = self.client.get(reverse("blog:article_preview", args=[article.id]))

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Rascunho interno")
        self.assertContains(response, "Visualização administrativa")

    def test_draft_article_stays_hidden_from_public_detail(self):
        article = ArtigoBlog.objects.create(
            usuario=self.admin,
            categoria=self.category,
            titulo="Rascunho publico bloqueado",
            resumo="Resumo",
            conteudo="Conteúdo em revisão",
            tempo_leitura=3,
            status=ArtigoBlog.STATUS_RASCUNHO,
        )

        response = self.client.get(reverse("blog:detail", args=[article.slug]))

        self.assertEqual(response.status_code, 404)
