import Image from '../schemas/Image';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

import fs from 'fs';
import path from 'path';

class ImageController {
  static getUIImages = (req: Request, res: Response) => {
    Image.find({}, (err: mongoose.CallbackError, items: typeof Image) => {
      if (err) {
        res.status(500).send('An error occurred');
      } else {
        res.render('imagesPage', { items: items });
      }
    });
  };

  static registerImage = (req: Request, res: Response) => {
    const obj = {
      data: fs.readFileSync(path.join('./src/uploads/' + req.file!.filename)),
      contentType: 'image/png',
    };
    Image.create(obj, err => {
      if (err) {
        res.send({ message: err.message });
      } else {
        // item.save();
        res.redirect('/image-ui');
      }
    });
  };

  static listImages = async (req: Request, res: Response) => {
    // Image.find((err, image) => {
    // 	const resp = image.map(data => data._id);
    // 	console.log('resp', resp);
    // 	res.status(200).json({data: { resp});
    // });
    const images = await Image.find({});

    res.status(200).json(images);
  };

  static listImagesId = async (req: Request, res: Response) => {
    // Image.find((err, image) => {
    // 	const resp = image.map(data => data._id);
    // 	console.log('resp', resp);
    // 	res.status(200).json({data: { resp});
    // });
    const images = await Image.find({});

    const imagesConv = images.map(image => {
      return { id: image.id };
    });

    res.status(200).json(imagesConv);
  };
}

export default ImageController;
