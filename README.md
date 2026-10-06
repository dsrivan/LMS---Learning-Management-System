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

Não é necessário instalar Java, Node.js nem PostgreSQL na sua máquina para executar o projeto com Docker Compose.

## Configuração do ambiente

O backend utiliza JWT para autenticação. Para assinar e validar os tokens, é necessário configurar a variável de ambiente `JWT_SECRET`.

### Executando com Docker Compose

Na raiz do projeto, duplique o arquivo `.env-example` e renomeie a cópia para `.env`:

```text
.env-example → .env
```

Em seguida, gere um segredo aleatório para desenvolvimento:

```bash
openssl rand -base64 32
```

Copie o valor gerado para a variável `JWT_SECRET` no arquivo `.env`.

O Docker Compose carregará automaticamente essa variável ao iniciar os serviços.

> Se o projeto for executado exclusivamente com Docker Compose, não é necessário realizar a configuração descrita na seção abaixo.

### Executando o backend fora do Docker

Caso queira executar o backend diretamente pelo IntelliJ IDEA, será necessário configurar JWT_SECRET como variável de ambiente da aplicação.

O arquivo .env não é carregado automaticamente pelo IntelliJ IDEA.

Nesse caso:

1. Abra **Run → Edit Configurations...**
2. Selecione a configuração da aplicação Spring Boot.
3. Em **Environment variables**, adicione:

```text
JWT_SECRET=your-secret-key
```

4. Execute a aplicação.

> Essa configuração é necessária apenas quando o backend for executado fora do Docker. Ao utilizar Docker Compose, essa etapa pode ser ignorada.

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

| Perfil        | E-mail                   | Senha          |
| ------------- | ------------------------ | -------------- |
| Administrador | `admin@learning.com`     | `admin123`     |
| Aluno         | `estudante@learning.com` | `estudante123` |

> Credenciais apenas para testes em desenvolvimento.

## Roteiro de teste

Após iniciar a aplicação, acesse o frontend em `http://localhost:4200`.

### Fluxo de administrador

1. Acesse Entrar.
2. Utilize:
   - E-mail: `admin@learning.com`
   - Senha: `admin123`
3. Acesse Administração → Cursos.
4. Crie um novo curso.
5. Edite o curso criado.
6. Exclua o curso.

### Fluxo de estudante

1. Acesse `Criar conta` ou utilize:
   - E-mail: `estudante@learning.com`
   - Senha: `estudante123`
2. Acesse Cursos disponíveis.
3. Matricule-se em um curso.
4. Acesse Meu aprendizado.
5. Abra o curso matriculado.
6. Cadastre uma tarefa informando categoria, data, descrição e tempo gasto.
7. Edite a tarefa cadastrada.
8. Verifique o histórico de tarefas.

## Teste de autorização

O usuário **estudante** não possui acesso à área de administração.

O usuário **administrador** pode gerenciar cursos, mas não utiliza o fluxo de estudante.

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

- **Backend:** implementado com autenticação JWT, autorização por perfil, gerenciamento de usuários, cursos, matrículas e registros de tarefas. Documentação da API disponível no Swagger.
- **Frontend:** integrado ao backend, com autenticação, controle de acesso por perfil, catálogo de cursos, matrícula, gerenciamento administrativo de cursos e registro/edição de tarefas.
- **Infraestrutura**: aplicação completa executável com Docker Compose.

## Registros de Decisões de Arquitetura (ADR)

As principais decisões arquiteturais do projeto estão documentadas em [Architecture Decision Records](./docs/adr/):

* [ADR 001 — Primary Key Strategy](./docs/adr/001-primary-key-strategy.md)
* [ADR 002 — JWT Authentication and Authorization](./docs/adr/002-jwt-authentication-and-authorization.md)
* [ADR 003 — Docker Compose Environment](./docs/adr/003-docker-compose-environment.md)


## Próximos passos

Para uma evolução do projeto além do escopo atual:

- Ampliar a cobertura de testes automatizados.
- Componentizar e reutilizar elementos comuns do frontend.
- Extrair funções e regras reutilizáveis para `utils` e serviços.
- Melhorar a organização e separação de responsabilidades no frontend.
- Implementar CI/CD para build, testes e deploy.
- Centralizar configurações de ambiente e secrets.
- Melhorar observabilidade com logs, métricas e health checks.
- Evoluir o controle de acesso e as políticas de segurança.
- Adicionar paginação e filtros ao catálogo de cursos.
- Evoluir a infraestrutura para um ambiente de cloud.

### Versão atual

- Backend: `0.0.1-alpha01`
- Frontend: `0.0.1-alpha01`
