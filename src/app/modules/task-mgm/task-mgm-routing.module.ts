import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './pages/customer/customer.component';
import { TaskDetailComponent } from './pages/task-detail/task-detail.component';
import { TaskEntryComponent } from './pages/task-entry/task-entry.component';
import { TaskListComponent } from './pages/task-list/task-list.component';

const routes: Routes = [
  {path: 'list', component: TaskListComponent},
  {path: 'detail', component: TaskDetailComponent},
  {path: 'entry', component: TaskEntryComponent},
  {path: 'customer' , component: CustomerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskMgmRoutingModule { }
