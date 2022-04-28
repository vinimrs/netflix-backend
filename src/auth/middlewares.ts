import passport from 'passport';
import Usuario from '../schemas/User';
import InvalidArgumentError from '../errors';
import { IUser } from '../schemas/User';

import tokens from './tokens';
import { NextFunction, Request, Response } from 'express';
import { TokenExpiredError } from 'jsonwebtoken';

interface TokenInRequisition extends Request {
	token?: string;
}

interface UserInReq extends Request {
	user?: IUser;
}

interface RefTokenAndUserInReq extends Request {
	refresh_token?: string;
	user?: IUser;
}

export default {
	local(req: Request, res: Response, next: NextFunction) {
		passport.authenticate(
			'local',
			{ session: false },
			(erro, usuario, info) => {
				if (erro && erro.name === 'InvalidArgumentError') {
					return res.status(401).json({ error: erro.message });
				}

				if (
					erro &&
					erro.message === 'E-mail do usuário não verificado'
				) {
					return res.status(401).json({ error: erro.message });
				}

				if (erro) {
					return res.status(500).json({ error: erro.message });
				}

				if (!usuario) {
					return res.status(401).json({ error: 'Usuário inválido' });
				}

				req.user = usuario;
				return next();
			}
		)(req, res, next);
	},

	bearer(req: TokenInRequisition, res: Response, next: NextFunction) {
		passport.authenticate(
			'bearer',
			{ session: false },
			(erro, usuario, info) => {
				if (erro && erro.name === 'JsonWebTokenError') {
					return res.status(401).json({ error: erro.message });
				}

				if (erro && erro.name === 'TokenExpiredError') {
					return res.status(401).json({
						error: erro.message,
						expiredAt: erro.expiredAt,
					});
				}

				if (erro) {
					return res.status(500).json({ error: erro.message });
				}

				if (!usuario) {
					return res
						.status(401)
						.json({ error: 'Token de usuário inválido' });
				}

				req.token = info;
				req.user = usuario;
				return next();
			}
		)(req, res, next);
	},
	async refresh(
		req: RefTokenAndUserInReq,
		res: Response,
		next: NextFunction
	) {
		try {
			const { refresh_token } = req.body; // Usuário enviará o token no corpo da requisição
			console.log('bearer', refresh_token);
			const id = await tokens.refresh.verifica(refresh_token);
			await tokens.refresh.invalida(refresh_token);
			const user = await Usuario.findById(id);
			if (user !== null) {
				req.user = user;
			}

			return next();
		} catch (error) {
			if (error instanceof Error) {
				if (error.name == 'InvalidArgumentError') {
					return res.status(401).json({ message: error.message });
				}
				return res.status(500).json({ error: error.message });
			}
		}
	},
	async verificacaoEmail(req: UserInReq, res: Response, next: NextFunction) {
		try {
			const { token } = req.params;
			const id = await tokens.verificacaoEmail.verifica(token);
			const user = await Usuario.findById(id);
			if (user !== null) req.user = user;

			return next();
		} catch (error) {
			if (error instanceof Error) {
				if (error.name === 'JsonWebTokenError') {
					return res.status(401).json({ erro: error.message });
				}

				if (error instanceof TokenExpiredError) {
					if (error.name === 'TokenExpiredError') {
						return res.status(401).json({
							erro: error.message,
							expiradoEm: error.expiredAt,
						});
					}
				}

				return res.status(500).json({ erro: error.message });
			}
		}
	},
};
