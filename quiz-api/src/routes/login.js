import Router from 'express';
import passport from 'passport';

const router = Router();

router.post('/', (req, res) => {
  passport.authenticate('local', function (error, user, info) {
    if (error) {
      return res.status(403).send(error);
    }
    req.logIn(user, function(error) {
      if (error) {
        return res.status(403).send(error);
      }
      return res.status(200).send(user);
    });
  })(req, res)
});

export default router;
