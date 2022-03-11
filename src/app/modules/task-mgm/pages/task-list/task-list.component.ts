import { Component, OnInit } from "@angular/core";
import { TaskdetailsService } from "../../services/taskdetails.service";

@Component({
  selector: "app-task-list",
  templateUrl: "./task-list.component.html",
  styleUrls: ["./task-list.component.scss"],
})
export class TaskListComponent implements OnInit {
  
  TaskTypes = [
    {id: "ALL", title: "All Tasks"},
    {id: "T3", title: "Overdue"},
    {id: "T1", title: "Open"},
    {id: "T2", title: "Closed"}
  ];

  selectedTask: any;
  taskDetails : any[];
  fileteredTasks : any[];
  constructor(public taskdetailservice: TaskdetailsService) {}

  ngOnInit(): void {
    this.selectedTask = this.TaskTypes[0];
    this.taskdetailservice.loadTaskDetails().subscribe( details => {
      this.taskDetails = details;
      this.filterTasks(this.selectedTask);
    });
  }

  filterTasks(task : any){
    console.log('filterTasks >>', task);
    this.selectedTask = task;
    if( task.id === 'ALL' ){
      this.fileteredTasks = this.taskDetails;
    }
    else{
      this.fileteredTasks = this.taskDetails.filter( _task => _task.task_type === task.id);
    }
    console.log('fileteredTasks >>', this.fileteredTasks);

  }
}
