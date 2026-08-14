# SavePet

Sistema web em Django para gerenciamento de pets, vacinas, localização por coleira simulada e conteúdos informativos para tutores.

O projeto foi desenvolvido como uma plataforma de apoio ao cuidado animal, permitindo que tutores cadastrem seus pets, acompanhem informações de saúde, registrem vacinas e visualizem a localização de uma coleira GPS simulada em mapa.

## Funcionalidades

- Cadastro e autenticação de usuários.
- Cadastro, edição, visualização e exclusão de pets.
- Registro de informações de saúde do pet, como alergias, doenças, medicamentos e observações.
- Cadastro e acompanhamento de vacinas.
- Controle de reforços de vacinas próximos.
- Módulo de localização com rastreador vinculado ao pet.
- Simulação de coleira GPS com geração automática de latitude e longitude.
- Mapa em tempo real usando Leaflet e OpenStreetMap.
- Blog com categorias, artigos publicados e rascunhos.
- Painel administrativo com resumo operacional.
- Administração de usuários, pets, categorias e artigos.
- Visualização administrativa de artigos em rascunho sem publicá-los.

## Tecnologias

- Python
- Django
- SQLite
- HTML
- CSS
- Bootstrap
- JavaScript
- Leaflet
- OpenStreetMap

## Estrutura Principal

```text
save_pet_pcc/
├── apps/
│   ├── accounts/     # Usuários, perfil e gestão de contas
│   ├── adminpanel/   # Painel administrativo do sistema
│   ├── blog/         # Categorias e artigos
│   ├── locator/      # Rastreadores, localizações e simulação GPS
│   ├── pets/         # Cadastro e saúde dos pets
│   └── vaccines/     # Vacinas e reforços
├── save_pet/         # Configurações principais do Django
├── static/           # Arquivos CSS
├── templates/        # Templates HTML
├── media/            # Uploads de imagens
├── manage.py
└── requirements.txt
```

## Como Rodar o Projeto

Clone o repositório e acesse a pasta do projeto:

```bash
cd save_pet_pcc
```

Crie e ative um ambiente virtual:

```bash
python -m venv .venv
source .venv/bin/activate
```

No Windows:

```bash
.venv\Scripts\activate
```

Instale as dependências:

```bash
pip install -r requirements.txt
```

Execute as migrações:

```bash
python manage.py migrate
```

Crie um usuário administrador:

```bash
python manage.py createsuperuser
```

Inicie o servidor:

```bash
python manage.py runserver
```

Acesse:

```text
http://127.0.0.1:8000/
```

## Acessos Importantes

- Login: `http://127.0.0.1:8000/access/login/`
- Dashboard: `http://127.0.0.1:8000/`
- Pets: `http://127.0.0.1:8000/pets/`
- Vacinas: `http://127.0.0.1:8000/vaccines/`
- Localizador: `http://127.0.0.1:8000/locator/`
- Blog: `http://127.0.0.1:8000/blog/`
- Painel Admin: `http://127.0.0.1:8000/painel-admin/`

## Simulação da Coleira GPS

A ideia original do sistema era utilizar uma coleira física com ESP e módulo GPS para enviar latitude e longitude em tempo real. Nesta versão, a coleira foi simulada dentro do Django.

O simulador gera coordenadas automaticamente e salva os pontos no banco de dados como se fossem enviados por uma coleira real.

### Passo a Passo

1. Acesse o sistema.
2. Cadastre um pet.
3. Acesse o módulo Localizador.
4. Vincule um rastreador ao pet.
5. Use o identificador do rastreador para iniciar a simulação.

Exemplo:

```bash
python manage.py simular_rastreador COL-THOR-001
```

Por padrão, a simulação começa em Guanambi-BA quando o rastreador ainda não tem localização registrada:

```text
Latitude: -14.2231
Longitude: -42.7799
```

Também é possível definir manualmente o ponto inicial:

```bash
python manage.py simular_rastreador COL-THOR-001 --latitude -14.2231 --longitude -42.7799
```

Gerar apenas uma quantidade limitada de pontos:

```bash
python manage.py simular_rastreador COL-THOR-001 --pontos 20 --intervalo 2
```

Parar a simulação contínua:

```text
Ctrl + C
```

## API de Localização

O sistema possui uma rota para registrar coordenadas por API. Ela representa o mesmo formato que futuramente poderia ser enviado por uma coleira real.

Endpoint:

```text
POST /locator/api/rastreadores/<identificador>/localizacoes/
```

Exemplo de JSON:

```json
{
  "latitude": -14.2231,
  "longitude": -42.7799
}
```

Também existe uma rota para consultar a última localização de um rastreador:

```text
GET /locator/api/rastreadores/<id>/ultima-localizacao/
```

## Mapa em Tempo Real

O mapa utiliza Leaflet com dados do OpenStreetMap.

Na tela do localizador, o usuário pode selecionar o pet/rastreador e acompanhar a localização atual. A tela consulta a API de última localização periodicamente e atualiza:

- marcador no mapa;
- latitude;
- longitude;
- horário da última atualização;
- linha com o trajeto recente.

## Painel Administrativo

O painel administrativo é acessível apenas para superusuários.

Nele é possível:

- visualizar totais do sistema;
- acompanhar reforços de vacina próximos;
- ver usuários recentes;
- gerenciar usuários;
- gerenciar pets de todos os tutores;
- gerenciar categorias;
- criar, editar, excluir e visualizar artigos;
- visualizar artigos em rascunho por preview administrativo.

O módulo comum de pets continua restrito ao tutor. Um usuário comum só visualiza e altera os próprios pets. A edição de pets de qualquer tutor fica disponível apenas no painel administrativo.

## Comandos Úteis

Rodar validação do Django:

```bash
python manage.py check
```

Rodar todos os testes:

```bash
python manage.py test
```

Rodar testes de apps específicos:

```bash
python manage.py test apps.locator
python manage.py test apps.blog
python manage.py test apps.adminpanel
```

Criar novas migrações após mudanças nos models:

```bash
python manage.py makemigrations
```

Aplicar migrações:

```bash
python manage.py migrate
```

## Observação Sobre a Simulação

A simulação da coleira foi adotada para representar o comportamento esperado do hardware sem depender da montagem física com ESP e módulo GPS.

Na evolução do projeto, a API de localização pode ser reaproveitada para receber dados reais de um dispositivo físico. Nesse cenário, o ESP enviaria requisições HTTP com latitude e longitude para o backend, mantendo a mesma lógica já implementada no sistema.
