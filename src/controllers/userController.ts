import user from '../schemas/User';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

class UserController {
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
		});
	};

	static registerUser = (req: Request, res: Response) => {
		const { name, email, password } = req.body;

		const newUser = new user({
			name,
			email,
			passwordHash: password,
			verifiedEmail: false,
		});

		newUser.save(err => {
			if (err) {
				res.status(500).send({
					message: `${err.message} - error in user register.`,
				});
			} else {
				res.status(201).send(newUser.toJSON());
			}
		});
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
		const id = req.params.id;

		user.findByIdAndUpdate(
			id,
			{ $set: req.body },
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
}

export default UserController;
