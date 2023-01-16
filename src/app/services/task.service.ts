import { Injectable } from '@angular/core';
import { TASKS } from 'src/app/mock-tasks';
import { Task } from 'src/app/Task';
import { Observable, of } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiURL ="http://localhost:4500/tasks"

  constructor(private http: HttpClient) { }
  
  getTasks2(): Observable<Task[]>{
    return this.http.get<Task[]>(this.apiURL)
  }

  getTasks() : Observable <Task[]> {
    const tasks = of(TASKS)
    return tasks;
  }
}
