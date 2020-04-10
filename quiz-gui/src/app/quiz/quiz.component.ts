import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TestService, Quiz, Answer, QuizResult } from '../services/test.service';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'quiz-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  panelOpenState = false;
  quiz: Quiz = null;
  showCorrect: boolean = false;

  constructor(private testService: TestService,
              private userService: UserService,
              private router: Router,
              private _snackBar: MatSnackBar) {

    let name = decodeURI(this.router.url.split('/quiz/')[1]);
    this.testService.getQuiz(name).subscribe(data => {
      this.quiz = data;
    }, err => {
      this._snackBar.open("Error:", err.error, {
        duration: 2000,
      });
    })
  }

  back(): void {
    this.router.navigateByUrl('player')
  }

  ngOnInit(): void {
  }

  toggleAnswer(answer: Answer) : void {
    answer.selected = !answer.selected;
  }

  answerColor(answer: Answer) : string {
    if (this.showCorrect) {
      return (answer.correct) ? "correct" : "wrong";
    } else {
      return answer.selected ? "selected" : "deselected";
    }
  }
  // ✓

  onSubmit(): void {
    if (this.showCorrect) {

    }

    let result = <QuizResult> { quizName: this.quiz.name, choices: []};

    for (let i of this.quiz.tests) {
      for (let a of i.answers) {
        result.choices.push(a.selected || false);
      }
    }

    this.testService.submitQuiz(result).subscribe(data => {
      this.showCorrect = true;
      this._snackBar.open("Score:", data.score, {
        duration: 2000,
      });
      alert(data.score);
    }, err => {
      this._snackBar.open("Error:", err.error, {
        duration: 2000,
      });
    });
  }

}
