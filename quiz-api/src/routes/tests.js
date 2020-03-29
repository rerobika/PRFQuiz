
import Router from 'express';
import testModel from '../models/test';

const router = Router();

router.post('/add', (req, res) => {
  console.log (req.body);
  let { test : {question, answers} } = req.body;

  if (!question || !answers)
  {
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

  testModel.findOne({question}, (err, user) => {
    if (err) {
      return res.status(500).send("Internal error");
    }

    if (user) {
      return res.status(403).send("Question alerady exists");
    }

    testModel.create(new testModel ({ question, answers }));

    return res.status(200).send("");
  });
});

router.get('/list', (req, res) => {
  testModel.find({}, (err, tests) => {
    if (err) {
      return res.status(500).send("Internal error");
    }

    return res.status(200).json(tests);
  });
});

export default router;
