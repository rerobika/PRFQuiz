import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'quiz-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  returnUrl: string;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.userService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'login';
  }

  onFormSubmit(username: string, password: string, passwordConfirm: string, role: string): void {
    this.userService.register(username, password, passwordConfirm, role)
    .subscribe(data => {
      this._snackBar.open("Succesful registration,", "please login", {
        duration: 2000,
      });
      this.router.navigateByUrl(this.returnUrl);
    }, err => {
      this._snackBar.open("Error:", err.error, {
        duration: 2000,
      });
    });
  }
}
