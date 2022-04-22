import { Router } from 'express';
import ImageController from '../controllers/imageController';
import multer from 'multer';

const router = Router();

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './src/uploads/');
	},
	filename: (req, file, cb) => {
		cb(null, new Date().getTime() + '-' + file.originalname);
		// cb(null, file.originalname);
	},
});

const upload = multer({ storage: storage });

router
	.get('/image-ui', ImageController.getUIImages)
	.get('/image', ImageController.listImages)
	.post('/image-ui', upload.single('image'), ImageController.registerImage);

export default router;
