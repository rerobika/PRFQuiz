import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestService, Quiz } from '../services/test.service';
import { UserService, User } from '../services/user.service';

@Component({
  selector: 'quiz-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  quizes: Array<Quiz> = [];
  user: User;


  constructor(private testService: TestService,
              private userService: UserService,
              private router: Router) {
    this.testService.listQuizzes().subscribe(data => {
      this.quizes = data;
    }, err => {
    })

    this.userService.user.subscribe(data => {
      this.user = data;
    }, err => {
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
    this.router.navigateByUrl(`/quiz/${q._id}`);
  }

}
