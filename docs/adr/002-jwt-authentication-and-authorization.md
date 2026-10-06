# ADR 002: JWT Authentication and Authorization

* **Status:** Accepted
* **Date:** 2026-10-06

## Context

A API precisa autenticar usuários e restringir operações de acordo com seus papéis (`ADMIN` e `STUDENT`), mantendo o backend stateless.

## Decision

Adotar **JWT** para autenticação e autorização.

* JWT enviado via `Authorization: Bearer <token>`.
* Roles `ADMIN` e `STUDENT`.
* Senhas armazenadas com `BCryptPasswordEncoder`.
* Backend responsável pela autorização.
* Sessões desabilitadas com `SessionCreationPolicy.STATELESS`.

## Consequences

* API stateless e simples de integrar com o frontend.
* Autorização centralizada no backend.
* O cliente precisa armazenar e enviar o JWT.
