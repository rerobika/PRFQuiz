import mongoose from 'mongoose';
import { questionSchema } from './test'

const quizSchema = new mongoose.Schema({
  questions: [questionSchema, {required: true}]
});

const quizModel = mongoose.model('quiz', quizSchema);

export default quizModel;
