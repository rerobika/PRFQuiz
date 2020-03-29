import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'quiz-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  returnUrl: string;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.userService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  }

  onFormSubmit(username: string, password: string): void {
    this.userService.login(username, password)
    .pipe(first())
    .subscribe(data => {
      this._snackBar.open("Succesful,", "login", {
        duration: 2000,
      });
      this.router.navigateByUrl(this.returnUrl || this.userService.loginRedirect());
    }, err => {
      this._snackBar.open("Error:", err.error, {
        duration: 2000,
      });
    });
  }
}
