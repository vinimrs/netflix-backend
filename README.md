# API REST para o Backend da Aplicação [Netflix-Clone](https://github.com/ViniR07/netflix-clone)

<img src="https://github.com/ViniR07/netflix-clone/blob/master/public/netflix-logo.svg" width="400px" />

**Backend utilizando Express com MVC, autenticação JWT, sistema de login com confirmação de E-mail, middlewares, views, upload de imagens, etc.**

 ## Confira 🔦

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
