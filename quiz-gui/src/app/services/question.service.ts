import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface Answer {
  answer: string,
  correct: boolean
};

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient,) { }

  addQuestion (question: string, answers: Array<Answer>) {
    console.log("sent");
    return this.http.post<any>(`${environment.apiUrl}/questions/add`, {question, answers});
  }
}
