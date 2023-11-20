import profile from '../schemas/Profile';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

class ProfileController {
  static listProfiles = (req: Request, res: Response) => {
    profile
      .find()
      .populate('images')
      .exec((err, profile) => {
        res.status(200).json(profile);
      });
  };

  static listProfileById = (req: Request, res: Response) => {
    const id = req.params.id;
    profile.findById(
      id,
      (err: mongoose.CallbackError, prof: typeof profile) => {
        if (err) {
          res.status(400).send({
            message: `${err.message} - Profile id not found.`,
          });
        } else {
          res.status(200).send(prof);
        }
      }
    );
  };

  static registerProfile = (req: Request, res: Response) => {
    const { name, image_id } = req.body;

    const newProfile = new profile({
      name,
      image: image_id,
    });

    newProfile.save(err => {
      if (err) {
        res.status(500).send({
          message: `${err.message} - error in Profile register.`,
        });
      } else {
        res.status(201).send(newProfile.toJSON());
      }
    });
  };

  static updateProfile = (req: Request, res: Response) => {
    const id = req.params.id;

    profile.findByIdAndUpdate(
      id,
      { $set: req.body },
      (err: mongoose.CallbackError) => {
        if (!err) {
          res.status(200).send({
            message: 'Profile updated.',
          });
        } else {
          res.status(500).send({ message: err.message });
        }
      }
    );
  };

  static deleteProfile = (req: Request, res: Response) => {
    const id = req.params.id;

    profile.findByIdAndDelete(id, (err: mongoose.CallbackError) => {
      if (!err) {
        res.status(200).send({ message: 'Profile Deleted.' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  };
}

export default ProfileController;
