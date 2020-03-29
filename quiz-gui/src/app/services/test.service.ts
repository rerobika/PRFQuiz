import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface Answer {
  answer: string,
  correct: boolean
};

export interface Test {
  question: string,
  answers: Array<Answer>
};

export interface QuizItem {
  test: Test,
  active: boolean
};

export interface Quiz {
  name: string,
  items: Array<QuizItem>
};

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient,) { }

  addTest (test: Test) {
    return this.http.post<any>(`${environment.apiUrl}/tests/add`, {test});
  }

  listTests () {
    return this.http.get<any>(`${environment.apiUrl}/tests/list`);
  }

  addQuiz (quiz: Quiz) {
    return this.http.post<any>(`${environment.apiUrl}/quizzes/add`, {quiz});
  }

}
