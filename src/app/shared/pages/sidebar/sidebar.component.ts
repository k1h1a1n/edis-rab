import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SidebarService } from './sidebar.service';
// import { MenusService } from './menus.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class SidebarComponent implements OnInit {
  menus = [];
  selectedTab : any;
  selectedTabMenus = [];
  menuHdrTabs = [];
  

  constructor(public sidebarservice: SidebarService) {
    this.menus = sidebarservice.getMenuList();
    if( this.menus?.length == 0 ){
      sidebarservice.loadMenuList().subscribe( menus => {
        this.menus = menus;
        this.processMenus();
      });
    }
    else{
      this.processMenus();
    }
   }

  ngOnInit() {
 
  }

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  toggleDDMenu(currentMenu) {
    if (currentMenu.type === 'dropdown') {
      console.log('dropdown');
      this.menus.forEach(element => {
        if (element === currentMenu) {
          currentMenu.active = !currentMenu.active;
        }
        else if( this.toggleChild(element, currentMenu) ){
          // do nothing
        }
        else {
          element.active = false;
        }
      });
    }
  }

  toggleMenu(currentMenu) {
    console.log('!dropdown', currentMenu);
    this.menus.forEach(element => {
      if (element.type === 'dropdown') {
        element.submenus.forEach(subMenuElm => {
          if (subMenuElm === currentMenu) {
            subMenuElm['active'] = true;
          }
          else if(this.toggleChild(subMenuElm,currentMenu)) {

          }
          else {
            subMenuElm['active'] = false;
          }
        });
      }
    });
  }

  toggleChild(parent, currentMenu) {
    let found = false;
    if (parent.type === 'dropdown') {
      // console.log('toggleChild...', parent, currentMenu);
      parent.submenus.forEach(element => {
        if (element === currentMenu) {
          currentMenu.active = !currentMenu.active;
          found = true;
        } else {
          element.active = false;
        }
      });
    }
    return found;
  }

  getState(currentMenu) {

    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }

  hasBackgroundImage() {
    return this.sidebarservice.hasBackgroundImage;
  }

  redirect(menu){
    console.log('redirect', menu);
    this.toggleMenu(menu);
    this.sidebarservice.redirect(menu.route, menu);
  }

  processMenus()
  {
    if( this.menus?.length > 0 )
    {
      this.menuHdrTabs = this.menus.filter( menu => {
        return menu.type == 'header';
      });
      this.selectMenuTab(this.menuHdrTabs[0]);
    }
  }

  selectMenuTab(menuTab){
    this.selectedTab = menuTab;
    this.selectedTabMenus = this.menus.filter( menu => {
      return menu.header == this.selectedTab.id;
    });
  }

  toggleSidePanel(){
    this.sidebarservice.toggle();
  }

}

