import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskdetailsService {
  taskDetails = [];
  constructor(private http: HttpClient) {
    this.loadTaskDetails();
  }

  loadTaskDetails(): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.get<any>(`assets/data/taskdetails.json`, httpOptions).pipe(
      tap( taskDetails => {
          this.taskDetails = taskDetails;
          console.log('Tapping taskDetails...', taskDetails);
      })
    );
  }

  gettaskDetailsList() {
    return this.taskDetails;
  }
}