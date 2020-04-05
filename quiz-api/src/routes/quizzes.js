
import Router from 'express';
import quizModel from '../models/quiz';
import { isAuthenticated } from './auth'

const router = Router();
router.use(isAuthenticated);

router.post('/add', (req, res) => {
  let { quiz : {name, items} } = req.body;

  if (!name || !items) {
    return res.status(403).send("Missing quiz attributes");
  }

  if (name.length == 0) {
    return res.status(403).send("Empty quiz name");
  }

  quizModel.findOne({name}, (err, quiz) => {
    console.log (err, quiz);
    if (err) {
      return res.status(500).send("Internal error");
    }

    if (quiz) {
      return res.status(403).send("Quiz already exists");
    }

    let tests = [];

    for (let i of items) {
      if (i.active) {
        tests.push(i.test);
      }
    }

    if (tests.length === 0) {
      return res.status(403).send("There must be at least one selected test");
    }

    quizModel.create(new quizModel({ name, author: req.user, tests, completed: [] }));

    return res.status(200).send("");
  });
});

router.get('/list', (req, res) => {
  quizModel.find({}, (err, quizzes) => {
    if (err) {
      return res.status(500).send("Internal error");
    }

    return res.status(200).json(quizzes);
  });
});

export default router;
