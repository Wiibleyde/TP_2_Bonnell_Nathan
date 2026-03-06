# TP 2 — Bonnell Nathan

API REST développée avec **Bun**, **Express** et **TypeScript** permettant de gérer des utilisateurs.

## Prérequis

- [Bun](https://bun.sh/) installé sur la machine

## Installation

```bash
bun install
```

## Lancement

```bash
bun run index.ts
```

Le serveur démarre sur le port **3001**. L'API est accessible à l'adresse `http://localhost:3001/api/users`.

## Endpoints

| Méthode | Route             | Description                         | Paramètres                              |
|---------|-------------------|-------------------------------------|-----------------------------------------|
| GET     | `/api/users`      | Récupérer tous les utilisateurs     | `?role=admin\|user` *(optionnel)*       |
| GET     | `/api/users/:id`  | Récupérer un utilisateur par son id | —                                       |
| POST    | `/api/users`      | Créer un nouvel utilisateur         | Body : `name`, `email`, `role`          |
| PUT     | `/api/users/:id`  | Modifier un utilisateur             | Body : `name`, `email`, `role` *(optionnels)* |
| DELETE  | `/api/users/:id`  | Supprimer un utilisateur            | —                                       |
