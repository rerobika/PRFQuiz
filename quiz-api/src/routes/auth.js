import Router from 'express';
import passport from 'passport';
import userModel from '../models/user'
import passportLocal from 'passport-local';

const router = Router();

export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(403).send("Unauthorized");
}

router.use(isAuthenticated);

router.get('/user', (req, res) => {
  return res.status(200).send(req.user);
});

passport.serializeUser((user, done) => {
  if (user) {
    done(null, user);
  }
});

passport.deserializeUser((id, done) => {
  done(null, id);
});

passport.use('local', new passportLocal.Strategy(function (username, password, done) {
  userModel.findOne({username}, (err, user) => {
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
