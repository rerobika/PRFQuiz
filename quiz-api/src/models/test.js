import mongoose from 'mongoose';

const testSchema = new mongoose.Schema({
  question: {type: String, required: true},
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  answers: [{answer: String, correct: Boolean}],
});

const testModel = mongoose.model('test', testSchema);

export default testModel;
