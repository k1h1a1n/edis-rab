import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Directive({
  selector: 'img[wmAssetsImg]'
})
export class WMImagePathDirective {

  @Input() active : boolean = true;
  IsOnError : boolean = false;

  THEME_NAME = 'Theme1';

  constructor(private el: ElementRef) {
    this.UpdateAssetsCDNLink('constructor');
    this.THEME_NAME = localStorage.getItem('CSSURL')?.replace('.css','') || 'Theme1';
  }

  @HostListener('load', ['$event'])
  onLoad(event): void{
    this.UpdateAssetsCDNLink('onload');
  }

  // Fallback added if image not found on local and try for ASSETS_CDN_URL
  @HostListener('error', ['$event'])
  onError(event): void{
    if( ! this.IsOnError )
    {
      this.UpdateAssetsCDNLink('onerror');
      this.IsOnError = true;
    }
  }

  UpdateAssetsCDNLink(callFrom)
  {
    // If active flag (SystemBanner) is set as false : no need to update IMG src path
    console.log('UpdateAssetsCDNLink : active :', this.active);
    if( !this.active ) return;

    const imgSrc = this.el.nativeElement.src;
    let assetsIdx = imgSrc.indexOf('assets');
    let themeIdx = imgSrc.indexOf('Theme');
    let assetsCDNIdx = imgSrc.indexOf(environment.ASSETS_CDN_URL);
    console.log(`UpdateAssetsCDNLink ${callFrom} ${imgSrc} : `, environment.ASSETS_CDN_URL);
    if( environment.ASSETS_CDN_URL && assetsIdx > -1 && assetsCDNIdx === -1 )
    {
      assetsIdx = assetsIdx + 'assets/'.length;
      const imgLoc = environment.ASSETS_CDN_URL + imgSrc.substring(assetsIdx);
      // console.log(`UpdateAssetsCDNLink ${themeIdx} ${this.THEME_NAME} ${imgLoc} `);
      this.el.nativeElement.src = imgLoc;
    }
    else if( assetsIdx > -1 )
    {
      // Change Theme
    }
  }
}
