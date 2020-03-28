import mongoose from 'mongoose';
import users from './user.js';

const dbUrl = "mongodb://localhost:27017";

export const connectDB = () => {
  return mongoose.connect(dbUrl);
};

mongoose.connection.on('connected', () => {
  console.log('Mongo conn OK');
});

mongoose.connection.on('error', (err) => {
  console.log('Mongo conn FAIL', err);
});

const models = { users };

export default models;
