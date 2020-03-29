import mongoose from 'mongoose';
import userModel from './user.js';
import testModel from './test.js';
import quizModel from './quiz.js';

const dbUrl = "mongodb://localhost:27017/PRFQuiz";

export const connectDB = () => {
  return mongoose.connect(dbUrl);
};

mongoose.connection.on('connected', () => {
  console.log('Mongo conn OK');
});

mongoose.connection.on('error', (err) => {
  console.log('Mongo conn FAIL', err);
});

const models = { userModel,
                 testModel,
                 quizModel
               };

export default models;
