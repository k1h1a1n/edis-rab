import { Injectable } from '@angular/core';
import { HandleError, HttpErrorHandler } from 'src/app/shared/error-handler/http-error-handler.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

declare const OpenAlertPopUpCallback : any;
declare const OpenConfirmPopUp : any;

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private handleError: HandleError;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'text/plain' })
  };

  constructor(
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandler) {
      this.handleError = httpErrorHandler.createHandleError('SharedService');
  }

  getMemberList(apiUrl, memberInput): Observable<any> {
    //Added HttpHeader LOCAL_CAHCE_TTL for time-based local caching
    this.httpOptions.headers = this.httpOptions.headers.append('LOCAL_CAHCE_TTL', ['GetGroupMembers_TTL','HH:24']);
    return this.http.post<any>(`${apiUrl}/GetGroupMembers`, memberInput, this.httpOptions)
   .pipe (
     catchError(this.handleError('getMemberList', []))
   );
  }

  // To display Under-Construction popup
  ShowUnderConstruct() {
    $('.underConstruct').css('display', 'flex');
  }

  // To display MFSearch Link on NavHeader
  ShowMFSearch(isShow)
  {
    $('.clsSearch')?.css('display', isShow ? 'block' : 'none');
  }

  // To Open Custom Alert Popup
  OpenAlertPopup( alertMessage, callback = (isOk) => {} ) {
    OpenAlertPopUpCallback( '', callback );
    document.getElementById('lblAlertTxt').innerHTML = alertMessage;

  }

  // To Open Custom Confirm Popup
  OpenConfirmPopup( confirmationMessage, callback ) {
    OpenConfirmPopUp( '', callback);
    document.getElementById('lblAlertTxt').innerHTML = confirmationMessage;

  }

  ToINRFormat(value)
  {
    // return this.inrFormat.transform(value)
  }

  DeepCopy(data : any)
  {
    return JSON.parse( JSON.stringify(data) );
  }

  CompareHoldingPattern( HoldingPatternID, HoldingPatternCode ) // patternID = 1-5 , atternCode : A-Z
  {
    const HoldingPatternMapping = {
      1 : 'SI',
      2 : 'JO',
      3 : 'AS',
      4 : 'AS',
      5 : 'AS'
    };
    const IsHoldingPatternMatched = (HoldingPatternMapping[HoldingPatternID] === HoldingPatternCode);
    if( IsHoldingPatternMatched ) console.log(`CompareHoldingPattern : ${HoldingPatternID} === ${HoldingPatternCode} ${IsHoldingPatternMatched}`, HoldingPatternMapping);
    return IsHoldingPatternMatched;
  }

  ParseFloat( val )
  {
    try{
      return parseFloat(val);
    }
    catch(e){
      return 0.0;
    }
  }

  ParseInt( val )
  {
    try{
      return parseInt(val);
    }
    catch(e){
      return 0;
    }
  }
}
