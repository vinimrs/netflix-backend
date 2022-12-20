<h1>
   <p> 
      <img src="https://github.com/ViniR07/netflix-clone/blob/master/public/netflix-logo.svg" width="160" align="center" />
      API REST para a aplicação <a href="https://github.com/ViniR07/netflix-clone/" target="_blank">Netflix-Clone</a>
   </p>
   <img src="https://img.shields.io/github/license/vinimrs/netflix-backend?color=black" align="center" />
</h1>

<!--
<img src="https://github.com/ViniR07/netflix-clone/blob/master/public/netflix-logo.svg" width="400px" />
-->

**Backend utilizando Express com MVC, autenticação JWT, sistema de login com confirmação de E-mail, middlewares, views, upload de imagens, etc.**

<p align="center">
   <img src="https://user-images.githubusercontent.com/92659173/165975664-c1ce512b-4ce0-4ab3-851f-1a6bc6baa520.png"  width="850"/>
   <p align="center">
      <i>Exemplo de requisição</i>
   </p>
</p>


## Features :hammer:

-   `Autenticação JWT completa`: refresh e access token!
-   `Gerenciamento de Sessão`: provê para as aplicações rotas de consulta de sessão!
-   `Provedor de todos os filmes`: faz o intermédio entre o cliente e a API de filmes!

## Tecnologias ⚡

-   [NodeJs](https://nodejs.org/en/)
-   [Express](https://expressjs.com/pt-br/)
-   [TypeScript](https://www.typescriptlang.org)
-   [Promise-MovieDB](https://www.npmjs.com/package/moviedb-promise)

## Bancos de dados 💾

-   [MongoDbAtlas](https://www.mongodb.com/cloud/atlas/lp/try2)
-   [Redis](https://redis.io)


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
