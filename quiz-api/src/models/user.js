import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  role: {type: String, required: true},
  filledQuizzes: [{quiz: {type: mongoose.Schema.Types.ObjectId, ref: 'quiz'}, score: Number}]
});

userSchema.pre('save', function(next) {
  let user = this;
  if (user.isModified('password')) {
    bcrypt.hash(user.password, 10, function(err, hash) {
      if (err) {
        return next (err);
      }
      user.password = hash;
      return next();
    });
  } else {
    return next();
  }
});

userSchema.methods.comparePasswords = function(password, next) {
  bcrypt.compare(password, this.password, (error, isMatch) => {
    return next(error, isMatch);
  })
};

const userModel = mongoose.model('user', userSchema);

export default userModel;
