import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CookieService } from './cookie.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private cookieService: CookieService) { }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/login`, {username, password})
    .pipe(map(
      user => {
        console.log (user);
        if (user) {
            this.cookieService.setCookie("user.role", user.role);
        }
        return user;
      }
    ));
  }

  register(username: string, password: string, passwordConfirm: string, role: string) {
    return this.http.post<any>(`${environment.apiUrl}/register`, {username, password, passwordConfirm, role});
  }

  logout() {
    this.cookieService.deleteCookie("user.role");
  }
}
