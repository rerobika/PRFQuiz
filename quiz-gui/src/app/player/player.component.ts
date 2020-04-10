import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestService, Quiz } from '../services/test.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'quiz-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  quizzes: Array<Quiz> = [];
  scores: Array<number> = [];

  constructor(private testService: TestService,
              private router: Router,
              private _snackBar: MatSnackBar) {
    this.testService.listQuizzes().subscribe(data => {
      this.quizzes = data.quizzes;
      this.scores = data.scores;
      console.log(this.quizzes);
    }, err => {
      this._snackBar.open("Error:", err.error, {
        duration: 2000,
      });
    })
  }

  ngOnInit(): void { }

  selectQuiz(q: Quiz) {
    this.router.navigateByUrl(`/quiz/${q.name}`);
  }

}
