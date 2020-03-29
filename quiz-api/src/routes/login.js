import Router from 'express';
import userModel from '../models/user'
import passport from 'passport';
import passportLocal from 'passport-local';

const router = Router();

router.post('/', (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(403).send("Missing credentials");
  }

  passport.authenticate('local', (error, user) => {
    if (error) {
      return res.status(403).send(error);
    }
    req.logIn(user, (error) => {
      if (error) {
        return res.status(500).send('Serilization failed');
      }

      return res.status(200).json(user);
    })
  })(req, res)
});

passport.serializeUser((user, done) => {
  return done(null, user._id);
});

passport.deserializeUser((_id, done) => {
  userModel.findOne({_id}, (err, user) => {
    return done(err, user);
  })
});

passport.use('local', new passportLocal.Strategy(function (username, password, done) {
  userModel.findOne({username: username}, (err, user) => {
    if (err || !user) {
      return done("User was not found", undefined);
    }
    user.comparePasswords(password, (e, isMatch) => {
      if (e) {
        return done("password comparison", undefined);
      }
      if (isMatch) {
        return done(null, user);
      }
      return done("Wrong password", undefined);
    });
  })
}));

export default router;
