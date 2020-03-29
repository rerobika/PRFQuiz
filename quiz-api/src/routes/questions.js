
import Router from 'express';
import userModel from '../models/user'
import questionModel from '../models/question';

const router = Router();

router.post('/add', (req, res) => {
  let {question, answers} = req.body;

  console.log (req.body);

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

  questionModel.findOne({question}, (err, user) => {
    if (err) {
      return res.status(500).send("Internal error");
    }

    if (user) {
      return res.status(403).send("Question alerady exists");
    }

    questionModel.create(new questionModel ({ question, answers }));

    return res.status(200).send("");
  });
});

export default router;
