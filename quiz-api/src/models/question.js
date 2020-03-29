import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  question: {type: String, unique: true, required: true},
  asnwers: [{type: String, required: true},
            {type: Boolean, required: true}],
});

const questionModel = mongoose.model('question', questionSchema);

export default questionModel;
