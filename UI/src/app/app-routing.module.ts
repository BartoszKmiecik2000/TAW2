import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  {
    path: '', component: TasksComponent
  },
  {
    path: 'create', component: CreateComponent
  },
  {
    path: 'edit/:id', component: CreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
