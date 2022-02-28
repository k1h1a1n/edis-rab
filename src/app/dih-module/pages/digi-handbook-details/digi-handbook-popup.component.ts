import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'digi-handbook-popup',
  template: `
    <div class="row MrgTopBtm4 dih_popup" style="display: none;">
      <div class="col-md-12">
        <div class="WhtBgWitShadowV2">
          <span class="dih_popup_close" (click)="Close(true)">
            <img wmAssetsImg src="assets/Images/Theme1/Close_Icon.png" class="img-fluid">
          </span>
          <div class="row">
            <div class="col-12 WrapperHeader">
              <ng-content select=".PopupHeader" ></ng-content>
            </div>
            <div class="col-12 WrapperContent">
              <ng-content select=".PopupContent" ></ng-content>
            </div>
            <div class="col-12 WrapperFooter">
              <ng-content select=".PopupFooter" ></ng-content>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`

    .WrapperHeader,
    .WrapperFooter{
      position: sticky;
    }

    .WrapperContent {
      height: calc( 100vh - 240px );
      overflow: scroll;
    }

    .dih_popup
    {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: 0;
      display: flex;
      display: -moz-flex;
      display: -webkit-flex;
      align-items: center;
      -moz-align-items: center;
      -webkit-align-items: center;
      z-index: 99999;
      background: rgba(0, 0, 0, .4);
      transition: display .15s ease-in-out;
    }
    .dih_popup .WhtBgWitShadowV2
    {
      max-width: calc( 100vw - 60px );
      float: none;
      border-radius: 10px;
      position: relative;
      max-height: calc( 100vh - 120px );
      margin: 60px auto;
    }
    .dih_popup_close
    {
      position: absolute;
      right: -22px;
      top: -20px;
      width: 46px;
      height: 46px;
      background-size: contain;
      background-repeat: no-repeat;
      cursor: pointer;
    }


    `
  ]
})
export class DigiHandbookPopupComponent implements OnInit {

  @Output() OnCancel = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  Open() {
    $('.dih_popup').css('display', 'block');
  }

  Close(isCancel?) {
    if(isCancel) this.OnCancel.emit(true);
    $('.dih_popup').css('display', 'none');
  }

}
