
import Router from 'express';
import quizModel from '../models/quiz';
import testModel from '../models/test';
import { isAuthenticated } from './auth'

const router = Router();
router.use(isAuthenticated);

router.post('/add', (req, res) => {
  let { quiz : {name, tests} } = req.body;

  if (!name || !tests) {
    return res.status(403).send("Missing quiz attributes");
  }

  if (name.length == 0) {
    return res.status(403).send("Empty quiz name");
  }

  quizModel.findOne({name}, (err, quiz) => {
    if (err) {
      return res.status(500).send("Internal error");
    }

    if (quiz) {
      return res.status(403).send("Quiz already exists");
    }

    let activeTests = [];

    for (let i of tests) {
      if (i.active) {
        activeTests.push(i.test);
      }
    }

    if (activeTests.length === 0) {
      return res.status(403).send("There must be at least one selected test");
    }

    quizModel.create(new quizModel({ name, author: req.user, tests: activeTests, completed: [] }));

    return res.status(200).send("");
  });
});

router.get('/list', (req, res) => {
  quizModel.find({}, (err, quizzes) => {
    if (err) {
      return res.status(500).send("Internal error");
    }

    return res.status(200).json({quizzes, user: req.user});
  });
});

router.post('/get', (req, res) => {
  let { name } = req.body;
  quizModel.findOne({name}, (err, quiz) => {
    if (err) {
      return res.status(500).send("Internal error");
    }

    if (!quiz) {
      return res.status(403).send("Cannot find quiz");
    }

    if (quiz.completed.findIndex(e => e.user == req.user) != -1) {
      return res.status(403).send("Quiz has been already filled");
    }

    let quizTests = [];

    for (let t of quiz.tests) {
      testModel.findOne({_id: t._id}, (err, test) => {
        if (err) {
          return res.status(500).send("Internal error");
        }
        quizTests.push(test);

        if (quizTests.length == quiz.tests.length) {
          quiz.tests = quizTests;
          console.log("OK", quizTests.length);
          return res.status(200).json(quiz);
        }
      });
    }
  });
});


export default router;
