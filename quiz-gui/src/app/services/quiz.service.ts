import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Test } from './test.service';

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
export class QuizService {

  constructor(private http: HttpClient) { }

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
