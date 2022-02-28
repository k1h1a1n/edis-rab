import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

// import { onBackSubject } from './../../../app.component';
import { environment } from './../../../../environments/environment';
import { DigiInsureHandbookService } from '../../services/digi-insure-handbook.service';
import { DigiHandbookShare } from './../../models/digi-handbook';


@Component({
  selector: 'digi-insure-handbook',
  templateUrl: './digi-handbook-list.component.html',
  styleUrls: ['./digi-handbook-list.component.scss']
})
export class DigiHandbookListComponent implements OnInit, OnDestroy {

  // onBackSubscription : Subscription;
  DigiHandbkList = [];
  DigiHandbkShare: DigiHandbookShare;
  isResultGenerated = false;

  constructor( private DIHService : DigiInsureHandbookService ) {

      // this.onBackSubscription = onBackSubject.subscribe( x => {
      //   this.DIHService.GoBack();
      //   this.DIHService.GoBack();
      // });

    }

  ngOnInit(): void {

    if( !environment.DIH_IFAID ){
      environment.DIH_IFAID = localStorage.getItem("DIH_IFAID");
    }

    const labelHdr = document.getElementById('lblHeader');
    if(labelHdr)
    {
      labelHdr.innerText = 'Digital Insurance Handbook';
    }

    this.DigiHandbkShare = {
      ProposerName : '',
      ContactNo : '',
      PageCaption : '',
      FileName : '',
      TransID : ''
    };
    console.log('DigiHandbookListComponent ngOnInit : ', this.DigiHandbkShare);
    this.GetDigitalHandBook();
  }

  ngOnDestroy(): void {
    // this.onBackSubscription.unsubscribe();
  }

  GetDigitalHandBook() {
    console.log('DigiHandbookListComponent GetDigitalHandBook : ', environment.DIH_IFAID);
    this.DIHService.ShowLoader(true);
    this.isResultGenerated = false;
    this.DIHService.GetDigitalHandBook(environment.DIH_IFAID).subscribe( data => {
      this.DigiHandbkList = data;
      console.log(' GetDigitalHandBook : ', this.DigiHandbkList);
      this.DIHService.ShowLoader(false);
      this.isResultGenerated = true;
    });
  }

  /*
  DigiHandbk : {
    AvailUpto: "2021-11-26T22:26:36.793"
    CateId: 0
    CateName: "Digital Insurance Handbook"
    FileName: "http://videomgmtuat.datacompwebtech.com/PDF/6511269//DHB_A00005_211119222612.pdf"
    ProdDesc: "Digital Handbook"
    ProdName: "Digital Handbook"
    ProposerName: "Amit Singh & Family"
    QuotNo: "A00005"
    TranDate: "2021-11-19T22:24:48.027"
    TransID: "F211119222612"
  }
  */
  DownloadHandbook(DigiHandbk) {
    const dwnldFileName = `DHB_${DigiHandbk.TransID}.pdf`;
    // this.DIHService.DownloadURI(DigiHandbk.FileName, dwnldFileName, 0, 'Digital Handbook downloaded successfully !'); // Download
    this.DIHService.DownloadURI(DigiHandbk.FileName, dwnldFileName, 1, 'Digital Handbook downloaded successfully !'); // Download and View
  }

  ShareHandbook(DigiHandbk) {
    this.DigiHandbkShare.ProposerName = DigiHandbk.ProposerName;
    this.DigiHandbkShare.FileName = DigiHandbk.FileName;
    this.DigiHandbkShare.TransID = DigiHandbk.TransID;
    this.DIHService.SetCurrentStateData(this.DigiHandbkShare);

    const dwnldFileName = `DHB_${DigiHandbk.TransID}.pdf`;
    this.DIHService.DownloadURI(DigiHandbk.FileName, dwnldFileName, 2); // Download in background

    this.DIHService.Navigate('home/digital-handbook/share');
  }

  CreateNewDigitalHandBook() {
    this.DigiHandbkShare = {
      ProposerName : '',
      ContactNo : '',
      PageCaption : '',
      FileName : '',
      TransID : ''
    };
    this.DIHService.SetCurrentStateData(this.DigiHandbkShare);
    this.DIHService.Navigate('home/digital-handbook/details');
  }

}
