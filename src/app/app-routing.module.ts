import { NgModule } from '@angular/core';
import { Routes, RouterModule,  PreloadAllModules } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppStartComponent } from './app-start.component';
import { AppRoute404, AppRouteGuard } from './app-route.guard';
import { CustomMenuComponent } from './shared/pages/custom-menu/custom-menu.component';

const routes: Routes = [
  { path: '', component: AppStartComponent},
  {
    path: 'home',
    // canActivateChild: [AppRouteGuard],
    children: [
      {path: 'digital-handbook', loadChildren: () => import('./dih-module/dih-routing.module').then(m => m.DIHRoutingModule)},
      {path: 'tasks', loadChildren: () => import('./modules/task-mgm/task-mgm-routing.module').then(m => m.TaskMgmRoutingModule)},
      {path: 'life-entry', loadChildren: () => import('./modules/life-entry/life-entry-routing.module').then(m => m.LifeEntryRoutingModule)},
    ]
  },
  {
    path: 'menu',
    component: CustomMenuComponent
  },
  {path:'',redirectTo:'AppStartComponent', pathMatch: 'full' },
  // { path: '**', canActivate: [AppRouteGuard], component: AppRoute404}
  { path: '**', component: AppRoute404}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
        scrollPositionRestoration: 'top',
        onSameUrlNavigation: 'reload',
        relativeLinkResolution: 'legacy',
        useHash:true ,
        preloadingStrategy: PreloadAllModules
      }
    )
  ],
  providers:[
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
