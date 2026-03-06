# TP2

## Scénarios de test

1. **GET /api/users** — Vérifier que les 3 utilisateurs initiaux sont retournés `200`

![image](./img/tp2/1.png)

2. **POST /api/users** — Créer un nouvel utilisateur et noter l'id retourné `201`

![image](./img/tp2/2.png)

3. **GET /api/users/:id** — Récupérer l'utilisateur créé avec son id `200`

![image](./img/tp2/3.png)

4. **PUT /api/users/:id** — Modifier le rôle de cet utilisateur `200`

![image](./img/tp2/4.png)

5. **GET /api/users** — Vérifier que la liste contient maintenant 4 utilisateurs `200`

![image](./img/tp2/5.png)

6. **DELETE /api/users/:id** — Supprimer l'utilisateur créé `204`

![image](./img/tp2/6.png)

7. **GET /api/users/:id** — Tenter de récupérer l'utilisateur supprimé `404`

![image](./img/tp2/7.png)
