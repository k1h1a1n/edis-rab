import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskMgmRoutingModule } from './task-mgm-routing.module';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { TaskDetailComponent } from './pages/task-detail/task-detail.component';
import { TaskEntryComponent } from './pages/task-entry/task-entry.component';


@NgModule({
  declarations: [TaskListComponent, TaskDetailComponent, TaskEntryComponent],
  imports: [
    CommonModule,
    TaskMgmRoutingModule
  ]
})
export class TaskMgmModule { }
