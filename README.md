# tp_2_bonnell_nathan

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```
Scénarios :
1.	GET /api/users → vérifiez que les 3 utilisateurs initiaux sont retournés (code 200)
![image](./img/1.png)
2.	POST /api/users → créez un nouvel utilisateur, notez l'id retourné (code 201)
![image](./img/2.png)
3.	GET /api/users/:id → récupérez l'utilisateur créé avec son id (code 200)
![image](./img/3.png)
4.	PUT /api/users/:id → modifiez le rôle de cet utilisateur (code 200)
![image](./img/4.png)
5.	GET /api/users → vérifiez que la liste contient maintenant 4 utilisateurs (code 200)
![image](./img/5.png)
6.	DELETE /api/users/:id → supprimez l'utilisateur créé (code 204)
![image](./img/6.png)
7.	GET /api/users/:id → tentez de récupérer l'utilisateur supprimé (code 404)
![image](./img/7.png)
