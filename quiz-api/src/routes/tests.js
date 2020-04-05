
import Router from 'express';
import testModel from '../models/test';
import { isAuthenticated } from './auth'

const router = Router();
router.use(isAuthenticated);

router.post('/add', (req, res) => {
  let { test : {question, answers} } = req.body;

  if (!question || !answers) {
    return res.status(403).send("Missing question attributes");
  }

  if (question.length == 0) {
    return res.status(403).send("Empty question");
  }

  for (let a of answers) {
    if (a.answer.length == 0) {
      return res.status(403).send("Empty answer");
    }
  }

  if (answers.findIndex (e => e.correct) == -1) {
    return res.status(403).send("There must be at least one correct answer");
  }

  testModel.findOne({question}, (err, test) => {
    if (err) {
      return res.status(500).send("Internal error");
    }

    if (test) {
      return res.status(403).send("Test already exists");
    }

    testModel.create(new testModel({ question, author: req.user, answers }));

    return res.status(200).send("");
  });
});

router.get('/list', (req, res) => {
  testModel.find({author: req.user}, (err, tests) => {
    if (err) {
      return res.status(500).send("Internal error");
    }

    return res.status(200).json(tests);
  });
});

router.post('/get', (req, res) => {
  testModel.findOne({_id: req.body._id}, (err, test) => {
    if (err) {
      return res.status(500).send("Internal error");
    }

    return res.status(200).json(test);
  });
});

export default router;
