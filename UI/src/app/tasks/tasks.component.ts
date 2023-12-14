import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styles: [
  ]
})
export class TasksComponent implements OnInit {

  tasks: Task[];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.GetTasks().subscribe(res => {
      this.tasks = res;
    });
  }

  deleteTask(id: string) {
    if (confirm('Na pewno?')) {
      this.taskService.DeleteTask(id).subscribe(res => {
        if (res.status === 200) {
          for (let i = 0; i < this.tasks.length; i++) {
            if (id === this.tasks[i]._id) {
              this.tasks.splice(i, 1);
              break;
            }
          }
        }
      });
    }
  }
}
