import user, { IUser } from '../schemas/User';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import errors from '../errors';
import bcrypt from 'bcrypt';

import tokens from '../auth/tokens';
import Email from '../auth/email';
import { verificaUsuario } from 'auth/authStrategies';

interface CustomReq extends Request {
	user?: IUser;
	token?: string;
}

function generateAddress(route: string, token: string) {
	const baseUrl = process.env.BASE_URL;
	return `${baseUrl}${route}${token}`;
}

class UserController {
	static login = async (req: CustomReq, res: Response) => {
		try {
			const accessToken = tokens.access.cria(req.user!.id);
			const refresh_token = await tokens.refresh.cria(req.user!.id);
			res.set('Authorization', accessToken);
			res.status(200).json({ refresh_token });
		} catch (error) {
			if (error instanceof Error)
				res.status(500).json({ error: error.message });
		}
	};

	static logout = async (req: CustomReq, res: Response) => {
		try {
			tokens.access.invalida(req.token);
			res.status(204).json();
		} catch (error) {
			if (error instanceof Error)
				res.status(500).json({ error: error.message });
		}
	};

	static verifyEmail = async (req: CustomReq, res: Response) => {
		try {
			const usuario = req.user; // para não usar uma query podemos fazer parecido com as outras rotas: usar um middleware
			await user.findByIdAndUpdate(usuario?.id, {
				$set: { verifiedEmail: true },
			});
			res.status(200).json({ message: 'E-mail verificado com sucesso!' });
		} catch (error) {
			if (error instanceof Error)
				res.status(500).json({ error: error.message });
		}
	};

	static listUsers = (req: Request, res: Response) => {
		user.find()
			.populate('profiles.image')
			.exec((err, users) => {
				res.status(200).json(users);
			});
	};

	static listUserById = (req: Request, res: Response) => {
		const id = req.params.id;
		user.findById(id, (err: mongoose.CallbackError, users: typeof user) => {
			if (err) {
				res.status(400).send({
					message: `${err.message} - User id not found.`,
				});
			} else {
				res.status(200).send(users);
			}
		}).populate('profiles.image');
	};

	static registerUser = async (req: Request, res: Response) => {
		const { name, email, password } = req.body;

		try {
			const hash = await this.generatePasswordHash(password);

			const usuar = await user.findOne({ email });
			if (usuar) throw new Error('E-mail já cadastrado');

			const newUser = new user({
				name,
				email,
				passwordHash: hash,
				verifiedEmail: false,
			});

			newUser.save();

			const token = tokens.verificacaoEmail.cria(newUser.id);
			const endereco = generateAddress('/user/verify-email/', token);
			const emailVerificacao = new Email.EmailVerificacao(
				newUser,
				endereco
			);
			emailVerificacao.enviaEmail().catch(console.log);
			res.status(201).json({ message: 'User created' });
		} catch (error) {
			if (error instanceof Error) {
				if (error instanceof errors.InvalidArgumentError) {
					return res.status(400).json({ error: error.message });
				}
				res.status(500).json({ error: error.message });
			}
		}
	};

	static registerUserProfile = (req: Request, res: Response) => {
		const id = req.params.id;
		const { name, image_id } = req.body;

		user.findByIdAndUpdate(
			id,
			{ $push: { profiles: { name: name, image: image_id } } },
			err => {
				if (err) {
					console.log(err?.message);
					res.status(400).send({ message: 'Id não encontrado!' });
				} else {
					res.status(201).send({ message: 'Profile add.' });
				}
			}
		);
	};

	static updateUser = (req: Request, res: Response) => {
		try {
			const id = req.params.id;

			user.findByIdAndUpdate(
				id,
				{ $set: { name: req.body.name } },
				(err: mongoose.CallbackError) => {
					if (!err) {
						res.status(200).send({
							message: 'User updated.',
						});
					} else {
						res.status(500).send({ message: err.message });
					}
				}
			);
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).send({ message: error.message });
			}
		}
	};

	static deleteUser = (req: Request, res: Response) => {
		const id = req.params.id;

		user.findByIdAndDelete(id, (err: mongoose.CallbackError) => {
			if (!err) {
				res.status(200).send({ message: 'User Deleted.' });
			} else {
				res.status(500).send({ message: err.message });
			}
		});
	};

	static getSession = async (req: CustomReq, res: Response) => {
		res.status(200).json({
			data: {
				user: {
					username: req.user?.name,
					email: req.user?.email,
				},
				id: req.user?.id,
				verifiedEmail: req.user?.verifiedEmail,
				profiles: req.user?.profiles
					? req.user?.profiles.map(profile => {
							return {
								name: profile.name,
								image_id: profile.image,
							};
					  })
					: [],
			},
		});
	};

	static generatePasswordHash = async (senha: string) => {
		const hashCosts = 12;
		return await bcrypt.hash(senha, hashCosts);
	};
}

export default UserController;
