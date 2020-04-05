import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TestService, Quiz } from '../services/test.service';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'quiz-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quiz: Quiz = null;

  constructor(private testService: TestService,
              private userService: UserService,
              private router: Router,
              private _snackBar: MatSnackBar) {

    let name = decodeURI(this.router.url.split('/quiz/')[1]);
    console.log(name);
    this.testService.getQuiz(name).subscribe(data => {
      console.log(data);
      this.quiz = data;
    }, err => {
      this._snackBar.open("Error:", err.error, {
        duration: 2000,
      });
    })
  }

  ngOnInit(): void {
  }

  getTest(_id: string) {
    this.testService.getTest(_id);
  }

}
