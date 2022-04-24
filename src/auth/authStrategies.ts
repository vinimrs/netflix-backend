import passport from 'passport';
import LocalStrategy from 'passport-local';
import BearerStrategy from 'passport-http-bearer';

import Usuario from '../schemas/User';
import Errors from '../errors';
import bcrypt from 'bcrypt';
import tokens from './tokens';

import { IUser } from '../schemas/User';

const LStrategy = LocalStrategy.Strategy;
const BStrategy = BearerStrategy.Strategy;

export function verificaUsuario(usuario: IUser) {
	if (!usuario) {
		throw new Errors.InvalidArgumentError(
			'Não existe usuário com esse e-mail!'
		);
	}
}

async function verificaSenha(senha: string, senhaHash: string) {
	const senhaValida = await bcrypt.compare(senha, senhaHash);
	if (!senhaValida) {
		throw new Errors.InvalidArgumentError('E-mail ou senha inválidos!');
	}
}

export default {
	localStrategy: () => {
		passport.use(
			new LStrategy(
				{
					usernameField: 'email',
					passwordField: 'password',
					session: false,
				},
				async (email, password, done) => {
					try {
						const usuario = await Usuario.findOne({
							email: email,
						});
						console.log(usuario);
						if (usuario !== null) {
							verificaUsuario(usuario);
							await verificaSenha(password, usuario.passwordHash);
						}

						done(null, usuario);
					} catch (erro) {
						done(erro);
					}
				}
			)
		);
	},
	bearerStrategy: () => {
		passport.use(
			new BStrategy(async (token, done) => {
				try {
					const id = await tokens.access.verifica(token);
					const usuario = await Usuario.findById(id);
					done(null, usuario, token);
				} catch (erro) {
					done(erro);
				}
			})
		);
	},
};
