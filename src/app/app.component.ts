import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Router, RouterEvent, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavigationStart,NavigationEnd} from "@angular/router";
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { SidebarService } from './shared/pages/sidebar/sidebar.service';

export const onBackSubject : Subject<any> = new Subject();

declare function init_plugins(); // declare scripts
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: []
})
export class AppComponent implements OnInit,OnDestroy {
  sipCount:number=0;
  showLoader: number=0;
  subscription: any;
  subscription1: any;
  WhatsAppMsgArr: []=[];
  FundInfo: any;
  SearchFund: string="axis";
  serverno:string='0';
  displaycarticon:boolean=false;
  isbuy:boolean=false;

  constructor(public router: Router,private location: Location,private http: HttpClient,
    private renderer: Renderer2, public sidebarservice: SidebarService) {

    this.subscription= router.events.subscribe(
			( event: RouterEvent ) : void => {
				if ( event instanceof RouteConfigLoadStart ) {
          // this.showLoader=1;
				} else if ( event instanceof RouteConfigLoadEnd ) {
          // this.showLoader=0;
        }
        else if ( event instanceof NavigationEnd ) {
          init_plugins();
        }
      });
     this.subscription1= router.events.pipe(
        filter(e=> e instanceof NavigationStart),
        filter((e: NavigationStart)=> e.navigationTrigger=="popstate"))
        .subscribe((x: NavigationStart)=>
        {
          router.getCurrentNavigation().extras.state={...x.restoredState, navigationId:x.id};
        });

  }

  ngOnInit() {
    // environment.serverno=`${this.configService.getConfig().ConfigData[0].customError}`;
    // this.serverno=environment.serverno;
    // environment.timeOutErrorMsg=`${this.configService.getConfig().ConfigData[0].timeOutErrorMsg}`;
    // environment.noInternetConnMsg=`${this.configService.getConfig().ConfigData[0].noInternetConnMsg}`;
    // if(this.configService.getConfig().WhatsAppMsg!=null){
    //   this.WhatsAppMsgArr=this.configService.getConfig().WhatsAppMsg;
    //   localStorage.setItem("WhatsAppMsg",JSON.stringify(this.WhatsAppMsgArr));
    // }

    if (localStorage.getItem("IFAAppSett") != null) {
      this.isbuy = JSON.parse(localStorage.getItem("IFAAppSett")).IsBuyFund;
    }

  }

  gotoMain()
  {
    if(window.location.href.search("home")==-1){
      window.location.reload();
    }
    else
    {
      this.router.navigate(['LandingPage']);
    }
  }

  GoBack(){
       //If any observer not found for onBackSubject it restricts onBack functionality
    if(onBackSubject?.observers?.length){
      onBackSubject.next('Back');
      return;
    }

    if (window.history.length > 1) {

    if(this.router.url.includes("confirm-order-status")||this.router.url.includes("pg-selection")){
      this.router.navigate(['LandingPage']);
    }else
    this.location.back();
  } else {
    this.router.navigate(['LandingPage']);
  }
  }

  ngOnDestroy(){
    if(this.subscription!=undefined){
      this.subscription.unsubscribe();
    }
    if(this.subscription1!=undefined){
      this.subscription1.unsubscribe();
    }
  }

  ngAfterViewInit() {
    let loader = this.renderer.selectRootElement('#loader');
    this.renderer.setStyle(loader, 'display', 'none');
  }

  toggleSidebar() {
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  }
  toggleBackgroundImage() {
    this.sidebarservice.hasBackgroundImage = !this.sidebarservice.hasBackgroundImage;
  }
  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  hideSidebar() {
    this.sidebarservice.setSidebarState(true);
  }
}
