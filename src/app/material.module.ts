import {NgModule} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
 import {MatSelectModule} from '@angular/material/select';
 import {MatSliderModule} from '@angular/material/slider';
 import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';

 @NgModule({
  imports: [
 ],
  exports: [
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatMenuModule,
    MatIconModule
  ]
})

export class MaterialModule {}
