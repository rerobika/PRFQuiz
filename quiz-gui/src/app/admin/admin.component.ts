import { Component, OnInit } from '@angular/core';
import { QuestionService, Answer } from '../services/question.service';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

enum BUTTON_MODE {
  INIT = 0,
  QUESTION,
  QUIZ
};

const buttonDescs = [
  [ "New question",  "New quiz"],
  [ "Add answer",  "Save question"],
  [ "Save quiz",  "Add question"],
]

@Component({
  selector: 'quiz-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  answers: Array<Answer> = [];
  question: string;
  upperButtonDesc: string;
  lowerButtonDesc: string;
  mode: BUTTON_MODE;

  constructor(private questionService: QuestionService,
              private _snackBar: MatSnackBar) {
    this.updateMode(BUTTON_MODE.INIT);
   }

  ngOnInit(): void {
  }

  updateMode(mode: BUTTON_MODE) {
    this.mode = mode;
    this.upperButtonDesc = buttonDescs[this.mode][0];
    this.lowerButtonDesc = buttonDescs[this.mode][1];
  }

  onUpperButton() {
    switch (this.mode) {
      case BUTTON_MODE.INIT: {
        this.updateMode(BUTTON_MODE.QUESTION);
      }
      case BUTTON_MODE.QUESTION: {
        this.answers.push({answer: "", correct : false});
        break;
      }
      default: {
        break;
      }
    }
  }

  onLowerButton() {
    switch (this.mode) {
      case BUTTON_MODE.INIT: {
        this.updateMode(BUTTON_MODE.QUIZ);
      }
      case BUTTON_MODE.QUIZ: {
        this.answers.push({answer: "", correct : false});
        break;
      }
      default: {
        this.questionService.addQuestion(this.question, this.answers)
        .pipe(first())
        .subscribe(data => {
          this._snackBar.open("Save,", "question added", {
            duration: 2000,
          });

          this.answers = [];
        }, err => {
          this._snackBar.open("Error:", err.error, {
            duration: 2000,
          });
        });
        this.updateMode(BUTTON_MODE.INIT);
        break;
      }
    }
  }

}
