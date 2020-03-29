import mongoose from 'mongoose';

const testSchema = new mongoose.Schema({
  question: {type: String, required: true},
  answers: [{answer: String, correct: Boolean}],
});

const testModel = mongoose.model('test', testSchema);

export default testModel;
