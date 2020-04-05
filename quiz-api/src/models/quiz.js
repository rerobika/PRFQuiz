import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  name: {type: String, unique: true, required: true},
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  tests: [{type: mongoose.Schema.Types.ObjectId, ref: 'test' }],
  completed: [{filler: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}, score: Number}]
});

const quizModel = mongoose.model('quiz', quizSchema);

export default quizModel;
