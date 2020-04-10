import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface Answer {
  answer: string,
  correct: boolean
  selected?: boolean
};

export interface Test {
  question: string,
  answers: Array<Answer>,
  active?: boolean
};

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  addTest (test: Test) {
    return this.http.post<any>(`${environment.apiUrl}/tests/add`, {test});
  }

  listTests () {
    return this.http.get<Array<Test>>(`${environment.apiUrl}/tests/list`);
  }
}
