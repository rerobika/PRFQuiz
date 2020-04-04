import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  get user() {
    return this.http.get<any>(`${environment.apiUrl}/auth/user`);
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/login`, {username, password});
  }

  logout() {
    return this.http.get<any>(`${environment.apiUrl}/logout`);
  }

  register(username: string, password: string, passwordConfirm: string, role: string) {
    return this.http.post<any>(`${environment.apiUrl}/register`, {username, password, passwordConfirm, role});
  }
}

