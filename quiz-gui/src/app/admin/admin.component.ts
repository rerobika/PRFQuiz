import { Component, OnInit } from '@angular/core';
import { TestService, Test } from '../services/test.service';
import { QuizService, Quiz } from '../services/quiz.service';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

enum BUTTON_MODE {
  INIT = 0,
  QUESTION,
  QUIZ
};

const buttonDescs = [
  [ "New Test", "New Quiz" ],
  [ "Delete",  "Cancel"],
  [ "", "Cancel" ],
]

@Component({
  selector: 'quiz-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  test: Test;
  quiz: Quiz;
  mode: BUTTON_MODE;
  upperButtonDesc: string;
  lowerButtonDesc: string;

  constructor(private testService: TestService,
              private quizService: QuizService,
              private userService: UserService,
              private router: Router,
              private _snackBar: MatSnackBar) {
    this.resetState ();
  }

  logout(): void {
    this.userService.logout();
    this.router.navigateByUrl('welcome')
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
        this.addAnswer();
        break;
      }
      case BUTTON_MODE.QUESTION: {
        if (this.test.answers.length > 1) {
          this.test.answers.pop();
        }
        break;
      }
      default: {
        break;
      }
    }
  }

  resetState () {
    this.updateMode(BUTTON_MODE.INIT);
    this.test = { question: "", answers: [] };
    this.quiz = {name: "", tests: []};
  }

  addAnswer () {
    this.test.answers.push({answer: "", correct : false});
  }

  addTest () {
    this.testService.addTest(this.test)
    .subscribe(data => {
      this._snackBar.open("Save,", "Test added", {
        duration: 2000,
      });

      this.resetState();
    }, err => {
      this._snackBar.open("Error:", err.error, {
        duration: 2000,
      });
    });
  }

  addQuiz () {
    this.quizService.addQuiz(this.quiz)
    .subscribe(data => {
      this._snackBar.open("Save,", "Quiz added", {
        duration: 2000,
      });

      this.resetState();
    }, err => {
      this._snackBar.open("Error:", err.error, {
        duration: 2000,
      });
    });
  }

  getTests () {
    this.testService.listTests()
    .subscribe(data => {
        this.quiz.tests = data;
    }, err => {
      this._snackBar.open("Error:", err.error, {
        duration: 2000,
      });
    });
  }

  onLowerButton() {
    switch (this.mode) {
      case BUTTON_MODE.INIT: {
        this.getTests();
        this.updateMode(BUTTON_MODE.QUIZ);
        break;
      }
      case BUTTON_MODE.QUESTION: {
        this.resetState();
        break;
      }
      default: {
        this.resetState();
        break;
      }
    }
  }

}
