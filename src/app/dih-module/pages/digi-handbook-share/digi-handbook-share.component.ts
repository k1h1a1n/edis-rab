import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

// import { onBackSubject } from './../../../app.component';
import { DigiInsureHandbookService } from './../../services/digi-insure-handbook.service';
import { DigiHandbookShare, ShareOpts } from '../../models/digi-handbook';

@Component({
  selector: 'digi-handbook-share',
  templateUrl: './digi-handbook-share.component.html',
  styleUrls: ['./digi-handbook-share.component.scss']
})
export class DigiHandbookShareComponent implements OnInit, OnDestroy {

  // onBackSubscription : Subscription;
  ShareOpts = ShareOpts;
  SelShareOpt: ShareOpts = ShareOpts.View;
  DigiHandbkShare : DigiHandbookShare;

  ShareMessageBody = `
    We are pleased to share a *Digital Insurance Handbook*  of your Life Insurance Portfolio in an *interactive* and *menu driven* PDF \n
    This PDF can be best viewed in *Adobe Acrobat Viewer* app. If this app is not installed on your device, we highly recommend you to download it by clicking on the link given below: \n\n
    *Android:* \n
    https://play.google.com/store/apps/details?id=com.adobe.reader&hl=en_IN \n\n
    *Apple:* Built-in viewer is good enough  \n
`;

  constructor( private DIHService : DigiInsureHandbookService ) {
    this.DigiHandbkShare = this.DIHService.GetCurrentStateData();
    // this.onBackSubscription = onBackSubject.subscribe( x => {
    //   this.DIHService.Navigate('home/digital-handbook/list');
    // });
  }

  ngOnInit(): void {
    const labelHdr = document.getElementById('lblHeader');
    if(labelHdr)
    {
      labelHdr.innerText = 'Digital Insurance Handbook';
    }
    console.log('DigiHandbookShareComponent ngOnInit : ', this.DigiHandbkShare);
  }

  ngOnDestroy(): void {
    // this.onBackSubscription.unsubscribe();
  }

  Close(){
    this.DIHService.Navigate('home/digital-handbook/list');
  }

  SelShareOption(shareOpt? : ShareOpts){
    if( shareOpt !== undefined ){
      console.log('SelShareOption', shareOpt);
      this.SelShareOpt = shareOpt; // View - ShareWhapp - ShareOther
      if( shareOpt === ShareOpts.View ){
        const dwnldFileName = `DHB_${this.DigiHandbkShare.TransID}.pdf`;
        this.DIHService.DownloadURI(this.DigiHandbkShare.FileName, dwnldFileName, 1); // Download and View
      }
    }
  }

  SendPDF(whatsAppForm? : NgForm) {
    const fileOptions = Object.assign({}, whatsAppForm?.value || {} );
    fileOptions.fileName =  `DHB_${this.DigiHandbkShare.TransID}.pdf`;
    fileOptions.fileUrl = this.DigiHandbkShare.FileName;

    fileOptions.messageTo = this.DigiHandbkShare.ProposerName?.replace('& Family', '');
    fileOptions.message = `
    Dear ${fileOptions.messageTo},
    ${ this.ShareMessageBody }`;

    console.log('SendPDF fileOptions : ', fileOptions);
    if( whatsAppForm){
      if( this.isFormValid(whatsAppForm) ){
        this.DIHService.SendPDF('WA', fileOptions);
      }
    }
    else {
      this.DIHService.SendPDF('OA', fileOptions);
    }
  }

  SendMessage(whatsAppForm? : NgForm) {
    const messageOptions = Object.assign({}, whatsAppForm.value);

    messageOptions.messageTo = this.DigiHandbkShare.ProposerName?.replace('& Family', '');
    messageOptions.message = `
    Dear ${messageOptions.messageTo},
    ${ this.ShareMessageBody }`;

    console.log('SendMessage fileOptions : ', messageOptions)

    if( whatsAppForm && this.isFormValid(whatsAppForm) ){
      this.DIHService.SendMessage(messageOptions);
    }
  }

  isFormValid( whatsAppForm : NgForm ){
    console.log('isFormValid :', whatsAppForm);
    if( whatsAppForm.invalid ) {
      Object.keys( whatsAppForm.controls).forEach(key => {
        whatsAppForm.controls[key].markAsDirty();
      });
    }
    return whatsAppForm.valid;
  }
}
