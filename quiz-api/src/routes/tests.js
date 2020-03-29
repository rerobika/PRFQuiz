
import Router from 'express';
import testModel from '../models/test';

const router = Router();

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

    testModel.create(new testModel({ question, answers }));

    return res.status(200).send("");
  });
});

router.get('/list', (req, res) => {
  console.log ("asd");
  testModel.find({}, (err, tests) => {
    if (err) {
      return res.status(500).send("Internal error");
    }

    console.log (tests);
    return res.status(200).json(tests);
  });
});

export default router;
