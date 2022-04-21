import bodyParser from 'body-parser';
import express from 'express';

import { Router, Request, Response } from 'express';

const app = express();

const route = Router();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

route.get('/', (req: Request, res: Response) => {
	res.json({ message: 'hello world with Typescript' });
});

app.use(route);

app.listen(port, () => 'server running on port 3333');
