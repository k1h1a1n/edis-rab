import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from './../environments/environment';

@Component({
  selector: 'app-app-start',
  templateUrl: './app-start.component.html'
})
export class AppStartComponent implements OnInit {

  constructor(private router: Router) {
    // (window as any).ChangeTheme('Theme1.css');
    if (!$(".router_div").hasClass("top_margin_50px")) {
      $(".router_div").addClass("top_margin_50px");
    }
    $("body").addClass("inner_page_body");
    environment.DIH_IFAID = localStorage.getItem("DIH_IFAID");
  }
  IsPersonalizeApp: number=0;
  ngOnInit(): void {
    if( environment.DIH_IFAID ){
      this.router.navigate(['home/digital-handbook/list']);
    }
  }

}
