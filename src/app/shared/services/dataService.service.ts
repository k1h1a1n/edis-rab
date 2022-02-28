import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class DataService {

   DataContainer = new BehaviorSubject({});
  //private DataContainer: BehaviorSubject<Profile> = new BehaviorSubject(null);
   DataContainers$ : any = {};

  constructor() {}

  // getData(): Observable<any> {
  //   return this.DataContainer.asObservable();
  // }

  getData(key?): Observable<any> {
    let _dataObservable : Observable<any>;
    _dataObservable = this.DataContainers$[key]?.asObservable();
    console.log('_dataObservable', _dataObservable);
    return _dataObservable ? _dataObservable : this.DataContainer.asObservable();
  }

  sendQuotationData(healthQuoteInputInfo: any[], ProductInfo: any,IsRecalculate: number) {
    this.DataContainer.next({healthQuoteInputInfo: healthQuoteInputInfo, ProductInfo: ProductInfo,IsRecalculate: IsRecalculate});
  }

  setCalcData(calcData: any) {
    this.DataContainer.next({calcData: calcData});
  }

  setMembID(MembId: any) {
    this.DataContainer.next({MembId: MembId});
  }

  setDataWithMembId(MembId,Data){
    this.DataContainer.next({MembId: MembId,Data: Data});
  }

  clearSubjectData(){
      this.DataContainer= new BehaviorSubject({});
  }

  // MF Portfolio start
  SetMFPortfolioData(MFPortfolioData,MembDetails){
    this.DataContainer.next({MFPortfolioData: MFPortfolioData,MembDetails: MembDetails});
  }

  SetMFMembData(MFPortfolioData,SchemeDetails,MembDetails){
    this.DataContainer.next({MFPortfolioData: MFPortfolioData,SchemeDetails: SchemeDetails,MembDetails: MembDetails});
  }

  setFundListData(FundListData,MFPortfolioData,MembDetails){
    this.DataContainer.next({FundListData:FundListData,MFPortfolioData: MFPortfolioData,MembDetails: MembDetails});
  }
  //MF Porfolio end

  //SIP Performance Data Start
  broadcastData(key: string, data: any) {
    let DataContainer$ = new BehaviorSubject({});
    DataContainer$.next(data);
    this.DataContainers$[key] = DataContainer$;
  }

  resetData(key?) {
    this.DataContainers$[key] = null;
  }
  //SIP Performance Data End
}
