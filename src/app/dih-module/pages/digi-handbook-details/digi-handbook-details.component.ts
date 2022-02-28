import { Component, OnInit, OnDestroy, ViewChild, HostListener, ElementRef, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject, Subscription, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';

// import { onBackSubject } from './../../../app.component';
import { SharedService } from 'src/app/shared/services/shared.service';
import { DigiInsureHandbookService } from '../../services/digi-insure-handbook.service';
import { DigiHandbookShare } from '../../models/digi-handbook';
import { IFAProfile, ProfileInputs } from '../../models/digi-branding';

@Component({
  selector: 'digi-handbook-details',
  templateUrl: './digi-handbook-details.component.html',
  styleUrls: ['./digi-handbook-details.component.scss']
})
export class DigiHandbookDetailsComponent implements OnInit, OnDestroy {

  // onBackSubscription : Subscription;
  @Input() IFACustProfile : IFAProfile = {
    profile_name: '',
    sub_title: '',
    mobile_no: '',
    email_id: ''
  } ;

  profileInputs = ProfileInputs;
  CustList : any[];
  searchSubject$ = new Subject<any>();
  custListResults$: Observable<any>;
  custListLoading = false;
  showCustList = false;
  selectedCust : any;

  DigiHandbkShare: DigiHandbookShare;
  @ViewChild(NgForm) detailForm: NgForm;
  @ViewChild('custListPopup') custListPopup : ElementRef;
  @HostListener('document:click', ['$event.target'])
  onClick(target) {
    if( this.custListPopup && this.showCustList )
    {
      const clickedInside = this.custListPopup.nativeElement.contains(target);
      if (!clickedInside) {
        console.log('outside click ');
        this.showCustList = false;
      }
    }
  }

  constructor(
    private sharedSvc: SharedService,
    private DIHService : DigiInsureHandbookService) {
    this.DigiHandbkShare = this.DIHService.GetCurrentStateData();

    if( !window['onDIHImageCaptured'] )
    {
      window['onDIHImageCaptured'] = this.onDIHImageCaptured.bind(this);
    }

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

    this.InitIFACustProfile();
    console.log('DigiHandbookDetailsComponent ngOnInit : ', this.DigiHandbkShare);
    this.InitiateSearchInput();
  }

  ngOnDestroy(): void {
    // this.onBackSubscription.unsubscribe();
  }

  InitIFACustProfile(){

    this.IFACustProfile = JSON.parse(localStorage.getItem('IFACustProfile'));
    if( !this.IFACustProfile ) {
      this.IFACustProfile = {
        profile_name: '',
        sub_title: '',
        mobile_no: '',
        email_id: ''
      };
      this.DIHService.ShowLoader(true);
      this.DIHService.GetIFADetail().subscribe(data => {
        console.log('InitIFACustProfile', data);
        this.IFACustProfile = {
          profile_name : data.Name || data.CompanyName || '',
          sub_title : data.LHSubHead || '',
          mobile_no : data.MobiNo || '',
          email_id : data.EmaiID || '',
          whatsapp_no : data.MobiNo || '',
          fb_url : data.facebookid || '',
          in_url : data.linkedinid || '',
          web_url : data.website || '',
          profile_pic :data.ifaphoto1
        };
        localStorage.setItem('IFACustProfile', JSON.stringify(this.IFACustProfile));
        this.setIFAProfilePic();
        this.DIHService.ShowLoader(false);
      });
    }
    else{
      this.setIFAProfilePic();
    }

  }

  InitiateSearchInput(){

    if( this.custListResults$ ) return;

    this.custListResults$ = this.searchSubject$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap(x =>{
        console.log('do..', x);
        this.showCustList = ( x?.length > 0 );
        this.custListLoading = true;
      }),
      switchMap(searchString => this.DIHService.GetGroupData(searchString).pipe(
        tap((dataList) => {
          this.custListLoading = false;
          console.log('custListResults', dataList);
          this.CustList = dataList;

          // behavior: smooth or auto
          // block : vertical alignment. One of start, center, end, or nearest. Defaults to start.
          // inline : horizontal alignment. One of start, center, end, or nearest. Defaults to nearest.
          document.getElementsByClassName('GroupCustomerResult')[0]?.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
        }),
        catchError(() => of([])) // empty list on error
      ))
    );
  }

  OnCustNameChanged(event){
    this.showCustList = ( event?.length > 0 );
    console.log(`OnCustNameChanged [${this.CustList}]`);
    this.searchSubject$.next(event);
  }

  OnCustNameFocused(){
    this.showCustList = ( this.CustList?.length > 0 );
    console.log(`OnCustNameFocused [${this.CustList}]`);
    this.custListLoading = false;
  }

  OnCustNameSelect(grpCust) {
    this.showCustList = false;
    this.DigiHandbkShare.ProposerName = grpCust.Name;
    this.DigiHandbkShare.PageCaption = `${grpCust.Name} & Family`;
    console.log('OnCustNameSelect grpCust', grpCust);
    this.selectedCust = grpCust;
  }

  ProcessDigitalHandBook() {
    console.log(' ProcessDigitalHandBook : ', this.detailForm);
    if( this.detailForm ){
      this.detailForm.ngSubmit.emit();
      if( this.detailForm.valid ){
        this.DIHService.ShowLoader(true);
        this.DIHService.FetchDIHInputData(this.DigiHandbkShare, this.IFACustProfile, this.selectedCust).subscribe( DigiHandbkInput => {

          // DigiHandbkInput = this.DIHService.GetSampleData(this.DigiHandbkShare);
          console.log(' FetchDIHInputData Result : ', DigiHandbkInput);
          if( DigiHandbkInput.PoliciesInput.length == 0 ){
            this.DIHService.ShowLoader(false);
            this.sharedSvc.OpenAlertPopup('No policies available to generate handbook');
          }
          else{
            this.detailForm.onSubmit(undefined);
            this.DIHService.ShowLoader(true);
            this.DIHService.ShowMessage('Digital handbook generation may take upto 2 min... \n Please wait...', 5);
            this.DIHService.ProcessDigitalHandBook(DigiHandbkInput).subscribe( data => {
              console.log(' ProcessDigitalHandBook : ', data);
              this.DigiHandbkShare.FileName = data?.Result?.HandBookURL;
              this.DigiHandbkShare.TransID = data?.Id;
              this.DIHService.SetCurrentStateData(this.DigiHandbkShare);
              this.DIHService.ShowLoader(false);
              this.DIHService.Navigate('home/digital-handbook/share');
            });
          }
        });
      }
      else {
        Object.keys( this.detailForm.controls).forEach(key => {
          this.detailForm.controls[key].markAsDirty();
        });
        return;
      }
    }
  }

  OnEditProfile(profile_popup) {
    this.ResetProfile();
    profile_popup.Open();
  }

  ResetProfile(){
    this.IFACustProfile = JSON.parse(localStorage.getItem('IFACustProfile'));
    this.setIFAProfilePic();
  }

  OnUpdateProfile(profileForm:NgForm, profile_popup) {
    console.log('OnEditProfile', profileForm, profileForm.value);
    console.log('OnEditProfile', this.IFACustProfile);
    profileForm.ngSubmit.emit();
    if(profileForm.valid){
      this.DIHService.ShowLoader(true);
      this.IFACustProfile = profileForm.value;
      localStorage.setItem('IFACustProfile', JSON.stringify(this.IFACustProfile));
      this.setIFAProfilePic();
      this.DIHService.SaveIFADetail(this.IFACustProfile).subscribe( res => {
        setTimeout(() =>{
          this.DIHService.ShowLoader(false);
          if( res?.status === 'S'){
            profile_popup.Close();
          }
          else{
            this.sharedSvc.OpenAlertPopup(` Error occured while saving data. <br> ${res?.ErrorMsg}`);
          }
        }, 300);
      });
    }
    else {
      Object.keys( profileForm.controls).forEach(key => {
        profileForm.controls[key].markAsDirty();
      });
      return;
    }
  }

  onProfilePicture(fileEvt, targetImg) {
    var profilePicFile = fileEvt?.srcElement?.files[0];
    console.log('Family Picture clicked !', fileEvt, profilePicFile);
    if( profilePicFile ){
      var reader = new FileReader();
      reader.onloadend = () => {
        targetImg.src = reader.result;
        this.IFACustProfile.profile_pic = reader.result.toString();
        this.DigiHandbkShare.ProfilePhoto = reader.result.toString();
        this.DIHService.SetBase64Image('profilePictureImg',reader.result.toString());
      }
      reader.readAsDataURL(profilePicFile);
      console.log('Profile Picture clicked !', targetImg);
      this.sharedSvc.OpenAlertPopup('Profile Picture updated !');
    }
  }

  onFamilyPicture(fileEvt, targetImg) {
    var familyPicFile = fileEvt?.srcElement?.files[0];
    console.log('Family Picture clicked !', fileEvt, familyPicFile);
    if( familyPicFile ){
      var reader = new FileReader();
      reader.onloadend = () => {
        targetImg.src = reader.result;
        this.DigiHandbkShare.FamilyPhoto = reader.result.toString();
        this.DIHService.SetBase64Image('familyPictureImg',reader.result.toString());
        // document.getElementById('familyPictureImg').setAttribute('src', reader.result.toString());
      }
      reader.readAsDataURL(familyPicFile);
      console.log('Family Picture clicked !', targetImg);
      this.sharedSvc.OpenAlertPopup('Family Picture updated !');
    }
  }

  onCaptureOrPickImage(imageId, imageTitle){
    const imageOptions = Object.assign({}, this.DigiHandbkShare);
    imageOptions['ImageID'] = imageId;
    imageOptions['ImageTitle'] = imageTitle;
    imageOptions['CallbackFunc'] = 'onDIHImageCaptured';
    this.DIHService.CaptureOrPickImage(imageOptions);
  }

  onDIHImageCaptured( imageData ) {
    console.log( 'From Angular IFACustProfile : ', this.IFACustProfile, this.DigiHandbkShare );
    const imageID = imageData.imgID;
    if( imageID === 'familyPictureImg' )
    {
      this.DigiHandbkShare.FamilyPhoto = imageData.imgData;
      this.DIHService.SetBase64Image( 'familyPictureImg', imageData.imgData);
      this.sharedSvc.OpenAlertPopup('Family Picture updated !');
    }
    else if( imageID === 'profilePictureImg' )
    {
      this.IFACustProfile.profile_pic = imageData.imgData;
      this.setIFAProfilePic();
      this.sharedSvc.OpenAlertPopup('Profile Picture updated !');
    }
    console.log( 'From Android imageData : ', imageData );
  }

  setIFAProfilePic(){
    this.DigiHandbkShare.ProfilePhoto = this.IFACustProfile?.profile_pic;
    this.DIHService.SetBase64Image('IFAProfilePic', this.IFACustProfile?.profile_pic, true );
    this.DIHService.SetBase64Image('profilePictureImg', this.IFACustProfile?.profile_pic, true );
  }

}
