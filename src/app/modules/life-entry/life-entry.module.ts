import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LicEntryComponent } from './pages/lic-entry/lic-entry.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [LicEntryComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class LifeEntryModule { }
