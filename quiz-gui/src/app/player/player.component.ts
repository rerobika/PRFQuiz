import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService, Quiz } from '../services/quiz.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../services/user.service';

@Component({
  selector: 'quiz-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  quizzes: Array<Quiz> = [];
  scores: Array<number> = [];

  constructor(private quizService: QuizService,
              private userService: UserService,
              private router: Router,
              private _snackBar: MatSnackBar) {
    this.quizService.listQuizzes().subscribe(data => {
      this.quizzes = data.quizzes;
      this.scores = data.scores;
    }, err => {
      this._snackBar.open("Error:", err.error, {
        duration: 2000,
      });
    })
  }

  logout(): void {
    this.userService.logout();
    this.router.navigateByUrl('welcome')
  }

  ngOnInit(): void { }

  selectQuiz(q: Quiz) {
    this.router.navigateByUrl(`/quiz/${q.name}`);
  }

}
