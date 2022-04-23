import express from 'express';
import UserController from '../controllers/userController';

const router = express.Router();

router
	.post('/user/profile/:id', UserController.registerUserProfile)
	.get('/user/:id', UserController.listUserById)
	.put('/user/:id', UserController.updateUser)
	.delete('/user/:id', UserController.deleteUser)
	.get('/user', UserController.listUsers)
	.post('/user', UserController.registerUser);

export default router;
