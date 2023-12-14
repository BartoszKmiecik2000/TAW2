import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  headers: HttpHeaders;

  constructor(private client: HttpClient) {
    this.headers = new HttpHeaders({'content-type': 'application/json'});
  }

  GetTasks(): Observable<Task[]> {
    return this.client.get<Task[]>(env.apiAddress + '/task');
  }

  GetTask(id: string): Observable<Task> {
    return this.client.get<Task>(env.apiAddress + '/task/' + id);
  }

  AddTask(task: Task): Observable<HttpResponse<any>> {
    return this.client.post<HttpResponse<any>>(env.apiAddress + '/task', JSON.stringify(task), {
      headers: this.headers,
      observe: 'response'
    });
  }

  UpdateTask(task: Task): Observable<HttpResponse<any>> {
    return this.client.put(env.apiAddress + '/task/' + task._id, JSON.stringify(task), {
      headers: this.headers,
      observe: 'response'
    });
  }

  DeleteTask(id: string): Observable<HttpResponse<any>> {
    return this.client.delete<HttpResponse<any>>(env.apiAddress + '/task/' + id, {
      observe: 'response'
    });
  }
}
