import allowlistRefreshToken from '../../redis/allowlistRefreshToken';
import blocklistAccessToken from '../../redis/blocklistAccessToken';

import crypto from 'crypto';
import moment from 'moment';
import jwt from 'jsonwebtoken';

import Errors from '../../errors';

function criaTokenJWT(id, [tempoQuantidade, tempoUnidade]) {
	const payload = {
		id,
	};

	const token = jwt.sign(payload, process.env.CHAVE_JWT, {
		expiresIn: tempoQuantidade + tempoUnidade,
	});
	return token;
}

async function criaTokenOpaco(id, [tempoQuantidade, tempoUnidade], allowlist) {
	const tokenOpaco = crypto.randomBytes(24).toString('hex');
	const dataExpiracao = moment().add(tempoQuantidade, tempoUnidade).unix(); // tempo de 5 dias
	console.log(tokenOpaco);
	await allowlist.adiciona(tokenOpaco, id, dataExpiracao); // adicionando na lista
	return tokenOpaco;
}

async function verificaTokenNaBlocklist(token, nome, blocklist) {
	if (!blocklist) return;
	const tokenNaBlocklist = await blocklist.contemToken(token);
	if (tokenNaBlocklist) {
		throw new jwt.JsonWebTokenError(`${nome} inválido por logout!`);
	}
}

async function verificaTokenJWT(token, nome, blocklist) {
	await verificaTokenNaBlocklist(token, nome, blocklist);
	const { id } = jwt.verify(token, process.env.CHAVE_JWT);
	return id;
}

async function verificaTokenOpaco(token, nome, allowlist) {
	verificaTokenEnviado(token, nome);
	const id = await allowlist.buscaValor(token);
	verificaTokenValido(id, nome);
	return id;
}

function verificaTokenValido(id, nome) {
	if (!id) {
		throw new Errors.InvalidArgumentError(`${nome} inválido!`);
	}
}

function verificaTokenEnviado(token, nome) {
	if (!token) {
		throw new Errors.InvalidArgumentError(`${nome} não enviado!`);
	}
}

async function invalidaTokenOpaco(token, allowlist) {
	await allowlist.deleta(token);
}

async function invalidaTokenJWT(token, blocklist) {
	await blocklist.adiciona(token);
}

export default {
	access: {
		nome: 'Access token',
		lista: blocklistAccessToken,
		expiracao: [1, 'm'],
		cria(id) {
			return criaTokenJWT(id, this.expiracao);
		},
		verifica(token) {
			return verificaTokenJWT(token, this.nome, this.lista);
		},
		invalida(token) {
			return invalidaTokenJWT(token, this.lista);
		},
	},
	refresh: {
		nome: 'Refresh token',
		expiracao: [5, 'd'],
		lista: allowlistRefreshToken,
		cria(id) {
			return criaTokenOpaco(id, this.expiracao, this.lista);
		},
		verifica(token) {
			return verificaTokenOpaco(token, this.nome, this.lista);
		},
		invalida(token) {
			return invalidaTokenOpaco(token, this.lista);
		},
	},
	verificacaoEmail: {
		nome: 'Token de verificação de e-mail',
		expiracao: [1, 'h'],
		cria(id) {
			return criaTokenJWT(id, this.expiracao);
		},
		verifica(token) {
			return verificaTokenJWT(token, this.nome);
		},
	},
};
