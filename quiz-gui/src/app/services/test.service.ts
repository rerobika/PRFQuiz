import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {  User } from './user.service';

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

export interface FilledQuiz {
  filler: User,
  score: number
};

export interface Quiz {
  name: string,
  tests: Array<Test>,
  score?: number,
};

export interface QuizResult {
  quizName: string,
  choices: Array<boolean>
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
    return this.http.get<Array<Test>>(`${environment.apiUrl}/tests/list`);
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

  submitQuiz (result: QuizResult) {
    return this.http.post<any>(`${environment.apiUrl}/quizzes/submit`, result);
  }
}
