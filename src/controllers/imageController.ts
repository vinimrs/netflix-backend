import Image from '../schemas/Image';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

import fs from 'fs';
import path from 'path';

class ImageController {
	static getUIImages = (req: Request, res: Response) => {
		Image.find({}, (err: mongoose.CallbackError, items: typeof Image) => {
			if (err) {
				console.log(err);
				res.status(500).send('An error occurred');
			} else {
				res.render('imagesPage', { items: items });
			}
		});
	};

	static registerImage = (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const obj = {
			data: fs.readFileSync(
				path.join('./src/uploads/' + req.file!.filename)
			),
			contentType: 'image/png',
		};
		Image.create(obj, (err, item) => {
			if (err) {
				console.log(err);
			} else {
				// item.save();
				res.redirect('/image-ui');
			}
		});
	};

	static listImages = (req: Request, res: Response) => {
		Image.find((err, image) => {
			const resp = image.map(data => data._id);
			res.status(200).json(resp);
		});
	};
}

export default ImageController;
