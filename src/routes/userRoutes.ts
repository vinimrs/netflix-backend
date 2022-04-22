import express from 'express';
import UserController from '../controllers/userController';

const router = express.Router();

router
	.get('/user', UserController.listUsers)
	.get('/user/:id', UserController.listUserById)
	.post('/user', UserController.registerUser)
	.post('/user/profile/:id', UserController.registerUserProfile)
	.put('user/:id', UserController.updateUser)
	.delete('/user/:id', UserController.deleteUser);

export default router;
