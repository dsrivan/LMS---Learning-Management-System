# ADR 003: Docker Compose como Ambiente de Execução

* **Status:** Accepted
* **Date:** 2026-10-06

## Context

O projeto possui frontend, backend e PostgreSQL, que precisam ser executados de forma consistente.

## Decision

Adotar **Docker Compose** para executar e integrar:

* Angular.
* Spring Boot.
* PostgreSQL.

Configurações sensíveis serão fornecidas por variáveis de ambiente e não serão versionadas.

## Consequences

* Ambiente reproduzível e simples de executar.
* Menor dependência de configurações locais.
* Requer Docker para execução.
