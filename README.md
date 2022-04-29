# API REST para o Backend da Aplicação [Netflix-Clone](https://github.com/ViniR07/netflix-clone)

<img src="https://github.com/ViniR07/netflix-clone/blob/master/src/assets/netflix-logo.svg" width="500px" />

Backend utilizando Express com MVC, autenticação JWT, sistema de login com confirmação de E-mail, middlewares, views, upload de imagens, etc.

 ## Confira 🔦
<!--
![gif-apresentacao](https://user-images.githubusercontent.com/92659173/156058722-46fad6b8-1803-4f29-8b6b-7a90414db900.gif)
![perfis](https://user-images.githubusercontent.com/92659173/156057034-277438a0-d2fe-4abc-81f1-13d40426100f.png)
![netflix-clone-1](https://user-images.githubusercontent.com/92659173/156057029-d245b3ab-c249-4610-99b8-21f91757c0fc.png)
![netflix-clone-2](https://user-images.githubusercontent.com/92659173/156057026-a8e6e95d-7656-48c7-870e-648dd6a31fe0.png) -->
![request-example](https://user-images.githubusercontent.com/92659173/165975664-c1ce512b-4ce0-4ab3-851f-1a6bc6baa520.png)

## Tecnologias ⚡

-   [NodeJs](https://nodejs.org/en/)
-   [Express](https://expressjs.com/pt-br/)
-   [TypeScript](https://www.typescriptlang.org)
-   [Promise-MovieDB](https://www.npmjs.com/package/moviedb-promise)

## Bancos de dados 💾

-   [MongoDbAtlas](https://www.mongodb.com/cloud/atlas/lp/try2)
-   [Redis](https://redis.io)

## Features :hammer:

-   `Autenticação JWT completa`: refresh e access token!
-   `Gerenciamento de Sessão`: facilidade para implementar o refresh!
-   `Provedor de todos os filmes`: menos responsabilidade para o cliente!

## Utilização da API :arrow_forward:

Com um simples fetch

```javascript
const res = await fetch(`${process.env.BACKEND_URL}/session`, {
	method: 'GET',
	headers: {
		Authorization: `Bearer ${token}`, // Obrigatório
	},
});
```

## Melhorias 🛠

Ideias de melhorias para o projeto:

-   Tipagem total
