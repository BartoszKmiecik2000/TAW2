import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styles: []
})
export class CreateComponent implements OnInit {

  task: Task;

  constructor(private taskService: TaskService, private router: Router, private route: ActivatedRoute) {
    this.task = new Task;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = params['id'];
      if (id !== undefined) {
        this.taskService.GetTask(id).subscribe(res => {
          this.task = res;
        });
      }
    });
  }

  SaveData(form: NgForm) {
    if (form.valid) {
      if (this.task._id !== undefined) {
        this.taskService.UpdateTask(this.task).subscribe(res => {
          if (res.status === 200) {
            this.router.navigate(['/']);
          }
        });
      } else {
        this.taskService.AddTask(this.task).subscribe(res => {
          if (res.status === 201) {
            this.router.navigate(['/']);
          }
        });
      }
    }
  }
}
