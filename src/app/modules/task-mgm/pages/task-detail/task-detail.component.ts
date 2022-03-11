import { Component, OnInit } from '@angular/core';
import { TaskdetailsService } from '../../services/taskdetails.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  ActivityTypes = [
    {id: "ALL", title: "All"},
    {id: "C", title: "Completed"},
    {id: "S", title: "Scheduled"}
  ];

  Activity : any[];
  selectedActivity: any;
  filteredActivity : any[];
  constructor(public taskdetailservice: TaskdetailsService) { }

  ngOnInit(): void {
    this.selectedActivity = this.ActivityTypes[0];
    this.taskdetailservice.loadTaskDetails().subscribe( activity => {
      this.Activity = activity;
      this.filterActivity(this.selectedActivity);
    });
  }

  filterActivity(activity : any){
    this.selectedActivity = activity;
    if ( activity.id == 'ALL') {
      this.filteredActivity = this.Activity[0]['activities']
    }
    else{
      this.filteredActivity = this.Activity[0]['activities'].filter( _activity => _activity.status == activity.id)
    }
  }

}
