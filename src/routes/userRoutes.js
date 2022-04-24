import express from 'express';
import UserController from '../controllers/userController';
import middlewares from '../auth/middlewares';

const router = express.Router();

router
	.post('/user/update-token', middlewares.refresh, UserController.login)
	.get(
		'/user/verify-email/:token',
		middlewares.verificacaoEmail,
		UserController.verifyEmail
	)
	.post('/user/login', middlewares.local, UserController.login)
	.post(
		'/user/logout',
		[middlewares.refresh, middlewares.bearer],
		UserController.logout
	)
	.post('/user', UserController.registerUser)
	.get('/user', middlewares.bearer, UserController.listUsers)
	.get('/user/:id', middlewares.bearer, UserController.listUserById)
	.put('/user/:id', middlewares.bearer, UserController.updateUser)
	.delete('/user/:id', middlewares.bearer, UserController.deleteUser)
	.post(
		'/user-profile/:id',
		middlewares.bearer,
		UserController.registerUserProfile
	)
	.get('/session', middlewares.bearer, UserController.getSession);

export default router;
