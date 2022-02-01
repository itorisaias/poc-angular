import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Todo } from './models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTodos() {
    return this.http.get<Todo[]>(`${this.url}/todos`);
  }

  getProducts() {
    return this.http.get(`${this.url}/products`);
  }
}
