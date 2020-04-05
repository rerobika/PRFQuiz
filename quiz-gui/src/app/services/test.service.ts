import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {  User } from './user.service';

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

export interface FilledQuiz {
  filler: User,
  score: number
};

export interface Quiz {
  _id: number,
  name: string,
  tests: Array<QuizItem>,
  completed: Array<FilledQuiz>
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

  getTest (_id: string) {
    return this.http.post<any>(`${environment.apiUrl}/tests/get`, {name});
  }

  addQuiz (quiz: Quiz) {
    return this.http.post<any>(`${environment.apiUrl}/quizzes/add`, {quiz});
  }

  getQuiz (name: string) {
    return this.http.post<Quiz>(`${environment.apiUrl}/quizzes/get`, {name});
  }

  listQuizzes () {
    return this.http.get<any>(`${environment.apiUrl}/quizzes/list`);
  }

}
