import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  toggled = false;
  _hasBackgroundImage = true;
  menus = [];
  constructor(private http: HttpClient, private router: Router) {
    this.loadMenuList();
  }

  loadMenuList(): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.get<any>(`assets/data/menu.json`, httpOptions).pipe(
      tap( menus => {
        console.log('Tapping menus...', menus);
        this.menus = menus;
      })
    );
  }

  toggle() {
    this.toggled = ! this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  getMenuList() {
    return this.menus;
  }

  redirect(url, menu){
    this.router.navigateByUrl('/').then(() => {
      this.router.navigate([url], { state : menu });
      console.log(url , 'apna url')
    });
  }

  get hasBackgroundImage() {
    return this._hasBackgroundImage;
  }

  set hasBackgroundImage(hasBackgroundImage) {
    this._hasBackgroundImage = hasBackgroundImage;
  }
}
