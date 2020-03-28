import Router from 'express';
import passport from 'passport';
import passportLocal from 'passport-local';

const router = Router();

router.post('/', (req, res) => {
  if (req.body.username && req.body.password) {
    passport.authenticate('local', (error, username) => {
      if (error) {
        return res.status(403).send(error);
      }

      req.logIn(username, (error, usr) => {
        if (error) {
          return res.status(500).send('Failed serilization');
        }

        return res.status(200).send('Login SUCC');
      })
    }) (req, res);
  }

  return res.status(400).send('Missing login credentials!');
});

passport.serializeUser((user, done) => {
  if (!user) {
    return done('User does not exist!');
  }

  return done(null, user);
});

passport.deserializeUser((user, done) => {
  return done(null, user);
});

passport.use('local', new passportLocal.Strategy((username, password, done) => {
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
