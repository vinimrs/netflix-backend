import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_HOST!, err => {
  console.log('connected');
});

const db = mongoose.connection;

export default db;
