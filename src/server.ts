import app from './app';

const port = process.env.PORT || 3333;

// route.get('/', (req: Request, res: Response) => {
// 	res.json({ message: 'hello world with Typescript' });
// });

// app.use(route);

app.listen(port, () => {
	console.log('Server listening on port', port);
});
