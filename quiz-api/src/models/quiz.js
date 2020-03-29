import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  name: {type: String, unique: true, required: true},
  tests: [{type: mongoose.Schema.Types.ObjectId, ref: 'test' }]
});

const quizModel = mongoose.model('quiz', quizSchema);

export default quizModel;
