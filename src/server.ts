import app from './app';

const port = process.env.PORT || 3333;

// route.get('/', (req: Request, res: Response) => {
// 	res.json({ message: 'hello world with Typescript' });
// });

// app.use(route);

app.listen(Number(port), '0.0.0.0', () => {
	console.log('Server listening on port', port);
});
