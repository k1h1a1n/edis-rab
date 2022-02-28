
export enum ShareOpts {
  View,
  ShareWhatsapp,
  ShareOtherapp
}

export interface DigiHandbookShare {
  ProposerName : string;
  ContactNo : string;
  CountryCode?: string;
  PageCaption : string;
  FileName : string;
  TransID : string;
  FamilyPhoto? : string;
  ProfilePhoto? : string;
  GroupCode?: string;
}

export interface DigitalHandbookInput {

  CustId: string;
  CustName?: string;
  Email?: string;
  FBURL?: string;
  FamilyPhoto: string;
  GroupCode: string;
  IFAid?: string;
  LinkedInURL?: string;
  MobiNumb?: string;
  Photo?: string;
  PoliciesInput: PolicyInput[];
  ProdId: number;
  ProposerName: string;
  SubTitl?: string;
  WhatsApp?: string;

  LedgType?: string;
  isFreeHandbook?: boolean;
}

export interface PolicyInput {
  AnnuAmou?: string;
  AnnuMode: string;
  AnnuOpti: string;
  AnnuOptiDesc: string;
  AnnuPrem: string;
  BasiPrem: string;
  BranNumb: string;
  CommDate: string;
  CommPerc: string;
  DOB: string;
  DebiDay: string;
  FULIDate: string;
  FUPDate: string;
  FundId: number;
  GST: string;
  Gender: string;
  InstPrem: string;
  IsDead: boolean;
  IsHandicap: boolean;
  IsSmoker: boolean;
  LoanBala: number;
  LoanDate: string;
  Lumpsum: string;
  MatuDate: string;
  MatuSett: string;
  MembID: string;
  MembInde: string;
  NACHBankAcco: string;
  NACHBankName: string;
  NCO: string;
  NEFTBankAcco: string;
  NEFTBankName: string;
  Nominee: string;
  Others: string;
  OwnAgen: string;
  PPT: string;
  PaymMode: string;
  Plan: string;
  PlanName: string;
  PoliNumb: string;
  PoliStat: string;
  PremEndDate: string;
  PropMembID: string;
  PropMembInde: string;
  PropName: string;
  Remarks: string;
  Rider:RiderInput[];
  ShorName: string;
  Sum: string;
  TaxBene: string;
  Term: string;
}

export interface RiderInput{
  PoliNumb: string;
  RideBasicPremium: string;
  RideCode: string;
  RidePPT: string;
  RideSum: string;
  RideTerm: string;
}
        // "PoliNumb": "239631364",
        //   "RideBasicPremium": "140",
        //   "RideCode": "3",
        //   "RidePPT": "0",
        //   "RideSum": "200000",
        //   "RideTerm": "0"

 		    // "PoliNumb": "239631364",
        //             "RideBasicPremium": "140.00",
        //             "RideCode": "111",
        //             "RidePPT": "10",
        //             "RideSum": "200000",
        //             "RideTerm": "16",
        //             "RideStarDate": "26/03/2021 00:00:00",
        //             "RideEndDate": "26/03/2037 00:00:00"
