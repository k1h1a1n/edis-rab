import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LicEntryComponent } from './pages/lic-entry/lic-entry.component';



const routes: Routes = [
    {path: 'poilicy-entry', component: LicEntryComponent },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class LifeEntryRoutingModule { }