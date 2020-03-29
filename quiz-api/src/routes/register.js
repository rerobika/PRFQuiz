
import Router from 'express';
import userModel from '../models/user'

const router = Router();

router.post('/', (req, res) => {
  let {username, password, passwordConfirm, role} = req.body;

  console.log (req.body);
  if (!username
      || !password
      || !passwordConfirm
      || !role)
  {
    return res.status(403).send("Missing register attributes");
  }

  if (password != passwordConfirm) {
    return res.status(403).send("Passwords do not match");
  }

  if (password.length < 5) {
    return res.status(403).send("Passwords is too short.");
  }

  if (!["player", "admin"].includes(role)) {
    return res.status(403).send("Invalid role");
  }

  userModel.findOne({username}, (err, user) => {
    if (err) {
      return res.status(500).send("Internal error");
    }

    if (user) {
      return res.status(403).send("User alerady exists");
    }

    userModel.create(new userModel ({ username, password, role}));

    return res.status(200).send("");
  });
});

export default router;
