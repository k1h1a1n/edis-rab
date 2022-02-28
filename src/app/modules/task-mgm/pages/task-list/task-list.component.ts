import { Component, OnInit } from '@angular/core';
import { TaskdetailsService } from '../../services/taskdetails.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  taskDetails = [];
  selectedTab : any;
  selectedTabtaskDetails = [];
  taskDetailsHdrTabs =[];
  constructor(public taskdetailservice: TaskdetailsService) { 

    this.taskDetails = taskdetailservice.gettaskDetailsList();
    if( this.taskDetails?.length == 0 ){
      taskdetailservice.loadTaskDetails().subscribe( taskDetails => {
        this.taskDetails = taskDetails;
        this.processtaskDetails();
      });
    }
    else{
      this.processtaskDetails();
    }
  }

  ngOnInit(): void {
  }

  processtaskDetails()
  {
    if( this.taskDetails?.length > 0 )
    {
      this.taskDetailsHdrTabs = this.taskDetails.filter( taskDetails => {
        return taskDetails.type == 'header';
      });
      this.selecttaskdetailTab(this.taskDetailsHdrTabs[0]);
    }
  }

  selecttaskdetailTab(taskdetailTab){
    this.selectedTab = taskdetailTab;
    this.selectedTabtaskDetails = this.taskDetails.filter( taskdetail => {
      return taskdetail.header == this.selectedTab.id;
    });
  }


}
