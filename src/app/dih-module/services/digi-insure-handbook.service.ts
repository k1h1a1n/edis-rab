// import { message } from './../../shared/pages/custom-form/validate';
// import { File, Http, knownFolders, path } from '@nativescript/core'

import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

declare const JSInterface : any;

import { environment } from 'src/environments/environment';
import { SharedService } from 'src/app/shared/services/shared.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { IFAProfile, SaveIFADetailInput } from '../models/digi-branding';
import { DigitalHandbookInput, DigiHandbookShare } from './../models/digi-handbook';

@Injectable({
  providedIn: 'root'
})
export class DigiInsureHandbookService {

  private DIHListUrl = `${environment.magicStoreUrl}/GetDigitalHandbookListAsyc`;
  private DIHProcessUrl = `${environment.magicStoreUrl}/GenerateDigitalInsHandbookAsyc`;

  private SaveIFADetailUrl = `${environment.iMagicUrl}/Common/SaveIFADetails`;

  // private CRMIFADetailUrl = 'http://wmproapi.fundzmagiconline.com:81/api/Customer/GetIFADetail';
  private CRMIFADetailUrl = `${environment.imDataServiceUrl}/Customer/GetIFADetail`;

  // private CRMGroupDataUrl = 'https://wmdata.wealthmagic.in/api/MFData/GetGroupDataForCRM';
  private CRMGroupDataUrl = `${environment.imDataServiceUrl}/MFData/GetGroupDataForCRM`;

  // private CRMDigiHandbkUrl = 'http://wmproapi.fundzmagiconline.com:81/api/PolicyData/GetLIDigitalHandbook';
  private CRMDigiHandbkUrl = `${environment.imDataServiceUrl}/PolicyData/GetLIDigitalHandbook`;

  private DigiHandbookShare : DigiHandbookShare;

  httpOptionsJson = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  httpOptionsText = {
    headers: new HttpHeaders({
      'Content-Type': 'text/plain'
    })
  };

  constructor(private http: HttpClient,
    private router: Router,
    private location: Location,
    private sharedSvc: SharedService,
    private loaderSvc : LoaderService,
    private _snackBar: MatSnackBar) {
  }

  ShowLoader(flag){
    if( flag ){
      this.loaderSvc.show();
    }
    else{
      this.loaderSvc.hide();
    }
  }

  Navigate(url, data?){
    this.router.navigate([url], {state: data});
  }

  SetCurrentStateData(_DigiHandbookShare: DigiHandbookShare) {
    this.DigiHandbookShare = _DigiHandbookShare ;
  }

  GetCurrentStateData() {
    return this.DigiHandbookShare;
  }

  GoBack() {
    this.location.back();
  }

  ShowMessage(message, durationInSeconds = 2, alert = false) {
    if( alert ){
      this.sharedSvc.OpenAlertPopup(message);
    }
    else{
      this._snackBar.open(message, '', {
        duration: durationInSeconds  * 1000,
      })
    }
  }

  SendPDF(appId, fileOptions) {
    console.log( 'SendPDF Options...', fileOptions );
    if( typeof JSInterface !== 'undefined'){
      JSInterface.SendPDF(appId, JSON.stringify(fileOptions));
    }
    else{
      this.sharedSvc.OpenAlertPopup('PDF can not be send !');
    }
  }

  SendMessage(messageOptions) {
    console.log( 'SendMessage Options...', messageOptions );
    if( typeof JSInterface !== 'undefined'){
      JSInterface.SendMessage(JSON.stringify(messageOptions));
    }
    else{
      this.sharedSvc.OpenAlertPopup('Message can not be share !');
    }
  }

  DownloadURI(uri, name, downloadOpt, message?) {

    try{
      // const filePath: string = path.join(knownFolders.currentApp().path, name);
      // console.log('DownloadURI filePath', filePath);
      // Http.getFile(uri, filePath).then(
      //   (resultFile: File) => {
      //     // The returned result will be File object
      //   },
      //   e => {}
      // );
    }catch(e){

    }


    if( typeof JSInterface !== 'undefined'){
      JSInterface.DownloadFile(uri, name, downloadOpt, message);
    }
    else if(downloadOpt === 1){
      window.open(uri,'_blank');
    }
    else{
      const anchorLink = document.createElement("a");
      anchorLink.download = name;
      anchorLink.href = uri;
      document.body.appendChild(anchorLink);
      anchorLink.click();
      document.body.removeChild(anchorLink);
    }

  }

  CaptureOrPickImage( imageOptions ) {
    console.log( 'CaptureOrPickImage Options...', imageOptions );
    if( typeof JSInterface !== 'undefined'){
      JSInterface.CaptureOrPickImage( JSON.stringify(imageOptions));
    }
    else{
      console.log( 'JSInterface is not found ...' )
    }
  }

  SetBase64Image( imageId, imageData, showErrorImage = false ){
    console.log( 'SetBase64Image : ', imageId,  imageData?.length, showErrorImage );
    if( imageData ){
      if( (imageData + '').startsWith('data:image') ){
        document.getElementById(imageId).setAttribute('src', `${imageData}`);
      }
      else{
        document.getElementById(imageId).setAttribute('src', `data:image/*;base64,${imageData}`);
      }
    }
    else if(showErrorImage){
      document.getElementById(imageId).setAttribute('src', `assets/Images/DIH/IFA_Avtar.png`);
    }
  }

  GetGroupData(searchInput): Observable<any> {

    if(typeof searchInput == 'string' ){
      const CRMGroupDataInput = {
        SearchValue: searchInput
      };
      return this.http.post<any>(this.CRMGroupDataUrl, CRMGroupDataInput, this.httpOptionsJson)
      .pipe(
        map(result => result.SearchCRMData),
      );
    }
    else if(searchInput instanceof Array)
    {
      return of(searchInput);
    }
    else {
      return of([]);
    }
  }

  GetIFADetail(): Observable<any> {
    return this.http.post<any>(`${this.CRMIFADetailUrl}`, [], this.httpOptionsJson);
  }

  SaveIFADetail( ifaProfile : IFAProfile): Observable<any> {

    const IFADetailInput: SaveIFADetailInput = new SaveIFADetailInput();
    IFADetailInput.ProfileName = ifaProfile.profile_name;
    IFADetailInput.SubTitle = ifaProfile.sub_title;
    IFADetailInput.MobileNo = ifaProfile.mobile_no;
    IFADetailInput.WhatsappNo = ifaProfile.whatsapp_no;
    IFADetailInput.EmailID = ifaProfile.email_id;
    IFADetailInput.IFAPhoto = this.RemoveBase64(ifaProfile.profile_pic);
    IFADetailInput.FacebookID = ifaProfile.fb_url;
    IFADetailInput.LinkedinID = ifaProfile.in_url;
    IFADetailInput.Website = ifaProfile.web_url;

    return this.http.post<any>(`${this.SaveIFADetailUrl}`, IFADetailInput, this.httpOptionsJson);
  }

  GetDigitalHandBook(custId = ''): Observable<any> {

    return this.http.post<any>(`${this.DIHListUrl}/${custId}`, [], this.httpOptionsJson)
    .pipe(
      map(result => result.DigitalHandbook),
      map( DigiHbkList => {
        DigiHbkList = DigiHbkList.map( x => {
          x['isHandbookAvail'] = ( this.CalculateDiff(x.AvailUpto) >= 0 );
          return x;
        });
        return DigiHbkList;
      }),
    );
  }

  CalculateDiff(availDate){
    let date = new Date(availDate);
    let currentDate = new Date();
    let days = Math.floor((date.getTime() - currentDate.getTime()) / 1000 / 60 / 60 / 24);
    // console.log(date,currentDate,days)
    return days;
  }

  ProcessDigitalHandBook(DIHInputData : DigitalHandbookInput): Observable<any> {
    return this.http.post<any>(`${this.DIHProcessUrl}`, DIHInputData, this.httpOptionsJson);
  }

  FetchDIHInputData(input : DigiHandbookShare, IFACustProfile : IFAProfile, selCustomer: any) : Observable<DigitalHandbookInput>{
    // TODO : Prepare valid GroupCode, ProdId, CustId
    localStorage.setItem("GrouID", selCustomer?.GrouID);

    return this.http.post<DigitalHandbookInput>(`${this.CRMDigiHandbkUrl}`, selCustomer, this.httpOptionsJson)
    .pipe(
      map( DigiHandbkInput => {
        try{
          DigiHandbkInput.GroupCode = selCustomer?.GrouCode || "J00003";
          DigiHandbkInput.ProdId = 5;
          DigiHandbkInput.CustId = environment.DIH_IFAID; // "6511269";
          DigiHandbkInput.IFAid = environment.DIH_IFAID; // "6511269";
          DigiHandbkInput.CustName = IFACustProfile.profile_name || "";
          DigiHandbkInput.SubTitl = IFACustProfile.sub_title ||"";
          DigiHandbkInput.MobiNumb = IFACustProfile.mobile_no || "";
          DigiHandbkInput.WhatsApp = IFACustProfile.whatsapp_no || "";
          DigiHandbkInput.Email = IFACustProfile.email_id || "";
          DigiHandbkInput.FBURL = IFACustProfile.fb_url || "";
          DigiHandbkInput.LinkedInURL = IFACustProfile.in_url || "";
          DigiHandbkInput.ProposerName = input.PageCaption || "";

          // console.log(`Before RemoveBase64[${input.FamilyPhoto}][${IFACustProfile.profile_pic}]`);
          DigiHandbkInput.Photo = this.RemoveBase64(IFACustProfile.profile_pic);
          DigiHandbkInput.FamilyPhoto = this.RemoveBase64(input.FamilyPhoto);

          if( DigiHandbkInput.PoliciesInput ){
            DigiHandbkInput.PoliciesInput = DigiHandbkInput.PoliciesInput.map( PolicyInput => {
              console.log('PolicyInput : ', PolicyInput);
              PolicyInput.PoliStat = 'I';
              PolicyInput.IsDead = this.CheckNull( PolicyInput.IsDead, false);
              PolicyInput.IsHandicap = this.CheckNull( PolicyInput.IsHandicap, false);
              PolicyInput.IsSmoker = this.CheckNull( PolicyInput.IsSmoker, false);
              PolicyInput.Rider = this.CheckNull( PolicyInput.Rider, []);

              PolicyInput.CommDate = this.FormatDate(PolicyInput.CommDate);
              PolicyInput.DOB = this.FormatDate(PolicyInput.DOB);
              PolicyInput.FULIDate = this.FormatDate(PolicyInput.FULIDate);
              PolicyInput.FUPDate = this.FormatDate(PolicyInput.FUPDate);
              PolicyInput.LoanDate = this.FormatDate(PolicyInput.LoanDate);
              PolicyInput.MatuDate = this.FormatDate(PolicyInput.MatuDate);
              PolicyInput.PremEndDate = this.FormatDate(PolicyInput.PremEndDate);

              PolicyInput.BasiPrem = this.CheckNull( PolicyInput.BasiPrem, PolicyInput.InstPrem);

              return PolicyInput;
            });
          }
          else{
            DigiHandbkInput.PoliciesInput = [];
          }
        }
        catch{

        }
        return DigiHandbkInput;
      })
    );

  }

  RemoveBase64(imageData){
    // console.log(`RemoveBase64[${imageData}]`);
    if( !imageData || imageData === null || imageData === undefined ) return '';
    if( (imageData + '').indexOf(';base64,') > 0 )
    {
      return (imageData + '').split(';base64,')[1];
    }
    else
    {
      return imageData;
    }
  }

  CheckNull(value, defValue){
    try{
      return (value !== null && value !== undefined && value.trim()?.length > 0 ) ? value : defValue;
    }
    catch(e){
      return value;
    }
  }

  FormatDate(dateStr, datePattern = 'DD-MMM-YYYY'){
    let formattedDate = dateStr;
    // console.log('FormatDate', dateStr, formattedDate);

    if(dateStr && dateStr.length > 0) {
      const momentDate = moment(dateStr);
      if(momentDate){
        formattedDate = momentDate.format(datePattern);
      }
    }
    // console.log('FormatDate', dateStr, formattedDate);
    return formattedDate;
  }

}
