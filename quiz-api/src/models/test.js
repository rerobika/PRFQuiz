import mongoose from 'mongoose';

export const testSchema = new mongoose.Schema({
  question: {type: String, unique: true, required: true},
  asnwers: [{type: String, required: true},
            {type: Boolean, required: true}],
});

const testModel = mongoose.model('test', testSchema);

export default testModel;
