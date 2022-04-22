import mongoose from 'mongoose';

mongoose.connect(
	`mongodb+srv://vini:${process.env.MONGODB_CONNECT_PASSWORD}@netflixb.tzx7a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
	err => {
		console.log('connected');
	}
);

let db = mongoose.connection;

export default db;
