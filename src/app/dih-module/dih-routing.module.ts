import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { DigiHandbookListComponent } from './pages/digi-handbook-list/digi-handbook-list.component';
import { DigiHandbookDetailsComponent } from './pages/digi-handbook-details/digi-handbook-details.component';
import { DigiHandbookShareComponent } from './pages/digi-handbook-share/digi-handbook-share.component';

const routes: Routes = [
  {path: 'list', component: DigiHandbookListComponent},
  {path: 'details', component: DigiHandbookDetailsComponent},
  {path: 'share', component: DigiHandbookShareComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, FormsModule]
})
export class DIHRoutingModule { }
