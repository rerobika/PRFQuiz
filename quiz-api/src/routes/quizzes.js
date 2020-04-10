
import Router from 'express';
import quizModel from '../models/quiz';
import testModel from '../models/test';
import { isAuthenticated } from './auth'
import userModel from '../models/user';

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

    for (let t of tests) {
      if (t.active) {
        activeTests.push(t);
      }
    }

    for (let t of activeTests) {
      delete t.active;
    }

    if (activeTests.length === 0) {
      return res.status(403).send("There must be at least one selected test");
    }

    quizModel.create(new quizModel({ name, author: req.user, tests: activeTests }));

    return res.status(200).send("");
  });
});

router.get('/list', (req, res) => {
  quizModel.find({}, (err, quizzes) => {
    if (err) {
      return res.status(500).send("Internal error");
    }

    if (!quizzes) {
      return res.status(500).send("Quizzes not found");
    }

    let scores = [];

    userModel.findOne({username: req.user.username}, (err, user) => {
      if (err) {
        return res.status(500).send("Internal error");
      }

      if (!user) {
        return res.status(500).send("User not found");
      }

      for (let q of quizzes) {
        let score = -1;
        for (let fq of user.filledQuizzes) {
          if (q._id.toString() == fq.quiz.toString()) {
            score = fq.score;
            break;
          }
        }
        scores.push(score);
      }

      return res.status(200).send({quizzes, scores});
    });
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

    userModel.findOne({username: req.user.username}, (err, user) => {
      if (err) {
        return res.status(500).send("Internal error");
      }

      if (!user) {
        return res.status(500).send("User not found");
      }

      if (user.filledQuizzes.findIndex(e => e.quiz == quiz._id) != -1) {
        return res.status(403).send("Quiz has been already filled");
      }

      let quizTests = [];

      for (let t of quiz.tests) {
        testModel.findOne({_id: t}, (err, test) => {
          if (err) {
            return res.status(500).send("Internal error");
          }
          quizTests.push(test);

          if (quizTests.length == quiz.tests.length) {
            quiz.tests = quizTests;
            return res.status(200).json(quiz);
          }
        });
      }
    });
  });
});

router.post('/submit', (req, res) => {
  let { choices, quizName } = req.body;
  quizModel.findOne({name: quizName}, (err, quiz) => {
    if (err) {
      return res.status(500).send("Internal error");
    }

    if (!quiz) {
      return res.status(403).send("Cannot find quiz");
    }

    userModel.findOne({username: req.user.username}, (err, user) => {
      if (err) {
        return res.status(500).send("Internal error");
      }

      if (!user) {
        return res.status(500).send("User not found");
      }

      if (user.filledQuizzes.findIndex(e => e.quiz == quiz) != -1) {
        return res.status(403).send("Quiz has been already filled");
      }

      let score = 0;
      let choiceIdx = 0;

      for (let t of quiz.tests) {
        testModel.findOne({_id: t}, (err, test) => {
          if (err) {
            return res.status(500).send("Internal error");
          }

          if (!test) {
            return res.status(403).send("Cannot find test");
          }

          let passed = true;
          for (let a of test.answers) {
            if (a.correct != choices[choiceIdx++]) {
              passed = false;
            }
          }

          if (passed) {
            score++;
          }

          if (choiceIdx == choices.length) {
            const updated = {
              filledQuizzes: Array.from(user.filledQuizzes)
            }
            updated.filledQuizzes.push({ quiz, score });
            userModel.updateOne({_id: req.user._id}, updated, (err, doc) => {
              if (err) {
                return res.status(500).send("Internal error");
              }
              return res.status(200).json({score});
            });
          }
        });
      }
    });
  });
});

export default router;
