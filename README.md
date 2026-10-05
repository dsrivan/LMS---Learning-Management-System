# LMS - Learning Management System

Sistema de gerenciamento de aprendizagem em que estudantes se matriculam em cursos e registram suas atividades de estudo, e administradores gerenciam o catálogo de cursos.

## Tech Stack

| Camada         | Tecnologias                                              |
| -------------- | -------------------------------------------------------- |
| Frontend       | Angular 22, Tailwind CSS                                 |
| Backend        | Java 25, Spring Boot 4.0.8, Spring Data JPA, API RESTful |
| Banco de dados | PostgreSQL                                               |
| Infraestrutura | Docker Compose                                           |

## Pré-requisito

- [Docker](https://docs.docker.com/get-docker/) com o Docker Compose instalado.

Não é necessário instalar Java, Node.js nem PostgreSQL na sua máquina.

## Como executar

Na raiz do projeto, execute:

```bash
docker compose up --build -d
```

Isso constrói as imagens e sobe o banco de dados, o backend e o frontend em segundo plano.

### Endereços

| Serviço              | URL / Porta                                   |
| -------------------- | --------------------------------------------- |
| Frontend             | http://localhost:4200                         |
| Backend (Swagger UI) | http://localhost:8080/swagger-ui/index.html#/ |
| PostgreSQL           | `localhost:5432`                              |

### Usuários iniciais

O backend já inicia com dois usuários para testes:

| Perfil        | E-mail               | Senha      |
| ------------- | -------------------- | ---------- |
| Administrador | `admin@learning.com` | `admin123` |
| Aluno         | `user@learning.com`  | `user123`  |

> Credenciais apenas para desenvolvimento. Altere-as antes de qualquer uso em produção.

## Comandos úteis

```bash
docker compose logs -f      # acompanhar os logs
docker compose ps           # ver o status dos serviços
docker compose down         # parar e remover os containers
docker compose down -v      # idem, e apaga também os dados do banco
```

## Regras de negócio

- Cadastro de estudante com idade mínima de 16 anos e e-mail único.
- Cada estudante pode estar matriculado em no máximo 3 cursos simultaneamente.
- O curso deve ser concluído em até 6 meses após a matrícula.
- O estudante registra tarefas por categoria (pesquisa, prática ou videoaula), em incrementos de 30 minutos.
- Somente administradores gerenciam os cursos, e o nome do curso deve ser único.

## Status do projeto

- **Backend:** em execução, com a documentação da API disponível no Swagger.
- **Frontend:** telas estáticas com dados fictícios (hardcoded). Ainda **sem integração com o backend**, sem lógica aplicada e com todas as rotas liberadas, sem autenticação.

### Versão atual

- Backend: `0.0.1-alpha01`
- Frontend: `0.0.1-alpha01`
