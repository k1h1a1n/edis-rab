import { Component, Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanActivateChild } from '@angular/router';
import { SharedService } from './shared/services/shared.service';

const UnderConstructionURLs = [
  '/home/MFWidgets/sip-comparison',
  '/home/MFWidgets/insurance-gap-calculator',
  '/home/MFWidgets/growth-calculator',
  '/home/MFEntryForms/my-eMandate'
];

@Injectable({
  providedIn: 'root'
})
export class AppRouteGuard implements CanActivate, CanActivateChild {

  constructor( private router: Router, private sharedService: SharedService ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean{
    console.log('CanActivate ...');
    return this.ProcessRouteRequest(route, state);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean{
    console.log('CanActivateChild ...');
    return this.ProcessRouteRequest(route, state);
  }

  ProcessRouteRequest(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  {
    console.log('ProcessRouteRequest ...', state, route?.component === AppRoute404);
    if( UnderConstructionURLs.includes( state?.url ) ){
      this.sharedService.ShowUnderConstruct();
      return false;
    }
    else if(route?.component === AppRoute404){
      this.router.navigate(['LandingPage']);
      return false;
    }
    else {
      return true;
    }
  }
}

@Component({
  selector: 'app-route-404',
  template: ''
})
export class AppRoute404{

}
