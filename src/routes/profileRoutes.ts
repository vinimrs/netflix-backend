import express from 'express';
import ProfileController from '../controllers/profileController';

const router = express.Router();

router
  .get('/profile', ProfileController.listProfiles)
  .get('/profile/:id', ProfileController.listProfileById)
  .post('/profile', ProfileController.registerProfile)
  .put('/profile/:id', ProfileController.updateProfile)
  .delete('/profile/:id', ProfileController.deleteProfile);

export default router;
