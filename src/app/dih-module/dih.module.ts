import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { DIHRoutingModule } from './dih-routing.module';
import { DigiHandbookListComponent } from './pages/digi-handbook-list/digi-handbook-list.component';
import { DigiHandbookShareComponent } from './pages/digi-handbook-share/digi-handbook-share.component';
import { DigiHandbookDetailsComponent } from './pages/digi-handbook-details/digi-handbook-details.component';
import { DigiHandbookPopupComponent } from './pages/digi-handbook-details/digi-handbook-popup.component';

@NgModule({
  declarations: [
    DigiHandbookPopupComponent,
    DigiHandbookListComponent,
    DigiHandbookShareComponent,
    DigiHandbookDetailsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    DIHRoutingModule,
  ],
  exports:[
    DigiHandbookPopupComponent
  ]
})
export class DIHModule { }
