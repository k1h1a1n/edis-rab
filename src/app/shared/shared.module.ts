import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialModule } from 'src/app/material.module';

import { LoaderComponent } from './pages/loader/loader.component';
import { UnderConstructionComponent } from './pages/under-construction/under-construction.component';
import { WMImagePathDirective } from './custom-directive/wm-assets-img.directive';
import { CustomDatepickerComponent } from './pages/custom-datepicker/custom-datepicker.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { CustomMenuComponent } from './pages/custom-menu/custom-menu.component';
import { RouterModule } from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [ LoaderComponent, UnderConstructionComponent, WMImagePathDirective, CustomDatepickerComponent, SidebarComponent, CustomMenuComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    OverlayModule,
    MaterialModule,
    PerfectScrollbarModule,
    RouterModule
  ],
  exports: [ LoaderComponent, UnderConstructionComponent, WMImagePathDirective, CustomDatepickerComponent, SidebarComponent, CustomMenuComponent],
  providers: [ {
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  }]
})
export class SharedModule { }
