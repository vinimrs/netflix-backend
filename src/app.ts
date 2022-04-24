import 'dotenv/config';
import express, { Request } from 'express';
import router from './routes';

import cors from 'cors';
import bodyParser from 'body-parser';

import db from './config/dbconnect';

import authStrategy from './auth/authStrategies';

db.on('error', console.log.bind(console, 'Erro de conexão'));
db.once('open', () => {
	console.log('conexão feita com sucesso');
});

const app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname));
authStrategy.bearerStrategy();
authStrategy.localStrategy();
router(app);

export default app;
