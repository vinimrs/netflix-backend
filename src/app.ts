import 'dotenv/config';
import express, { Request } from 'express';
import router from './routes';

import bodyParser from 'body-parser';

import db from './config/dbconnect';

db.on('error', console.log.bind(console, 'Erro de conexão'));
db.once('open', () => {
	console.log('conexão feita com sucesso');
});

const app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname));
router(app);

// Step 7 - the GET request handler that provides the HTML UI
// app.get('/', (req, res) => {
// 	imgModel.find({}, (err: any, items: any) => {
// 		if (err) {
// 			console.log(err);
// 			res.status(500).send('An error occurred');
// 		} else {
// 			res.render('imagesPage', { items: items });
// 		}
// 	});
// });

// // Step 8 - the POST handler for processing the uploaded file
// app.post('/', upload.single('image'), (req, res, next) => {
// 	const obj = {
// 		img: {
// 			data: fs.readFileSync(
// 				path.join(__dirname + 'src/uploads/' + req.file!.filename)
// 			),
// 			contentType: 'image/png',
// 		},
// 	};
// 	imgModel.create(obj, (err, item) => {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			// item.save();
// 			res.redirect('/');
// 		}
// 	});
// });

export default app;
