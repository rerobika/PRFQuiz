import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestService, Quiz } from '../services/test.service';
import { UserService, User } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'quiz-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  quizzes: Array<Quiz> = [];
  user: User;


  constructor(private testService: TestService,
              private userService: UserService,
              private router: Router,
              private _snackBar: MatSnackBar) {
    this.testService.listQuizzes().subscribe(data => {
      this.quizzes = data.quizzes;
      this.user = data.user;
    }, err => {
      this._snackBar.open("Error:", err.error, {
        duration: 2000,
      });
    })
  }

  ngOnInit(): void { }

  isCompleted(q: Quiz): boolean {
    if (q.completed.length == 0 || !this.user) {
      return false;
    }

    return q.completed.findIndex(e => e.filler.username == this.user.username) != -1;
  }

  getScore(q): string {
    return q.completed.find(e => e.filler.username == this.user.username).score.toString();
  }

  selectQuiz(q: Quiz) {
    this.router.navigateByUrl(`/quiz/${q.name}`);
  }

}
