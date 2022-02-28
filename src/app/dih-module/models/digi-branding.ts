export interface IFAProfile{
  profile_name: string;
  sub_title: string;
  mobile_no: string;
  email_id: string;
  whatsapp_no? : string;
  fb_url? : string;
  in_url? : string;
  web_url? : string;
  profile_pic? : string;
}

export class SaveIFADetailInput
{
  IFAID: number;
  ProfileName: string;
  SubTitle: string;
  MobileNo: string;
  WhatsappNo: string;
  EmailID: string;
  FacebookID: string;
  LinkedinID: string;
  Website: string;
  IFAPhoto: string;
}

export const ProfileInputs = [
	{
		type: 'text',
		name: 'profile_name',
		placeholder: 'Your Name(or Company Name)',
		label: 'Your Name(or Company Name)*',
		isRequired: true
	},
	{
		type: 'text',
		name: 'sub_title',
		placeholder: 'Sub Title',
		label: 'Sub Title*',
		isRequired: true
	},
	{
		type: 'text',
		name: 'mobile_no',
		placeholder: 'Mobile Number',
		label: 'Mobile No.*',
		isRequired: true,
		minlength: '10',
    pattern: '^[0-9]*$',
    inputmode: 'numeric'
	},
	{
		type: 'email',
		name: 'email_id',
		placeholder: 'Your Email ID',
		label: 'Email ID*',
		isRequired: true,
    pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, // '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$',
    inputmode: 'email'
	},
	{
		type: 'text',
		name: 'whatsapp_no',
		placeholder: 'WhatsApp Number',
		label: 'WhatsApp*',
		isRequired: true,
		minlength: '10',
    pattern: '^[0-9]*$',
    inputmode: 'numeric'
	},
	{
		type: 'text',
		name: 'fb_url',
		placeholder: 'Facebook Profile Link',
		label: 'Facebook',
    inputmode: 'url'
	},
	{
		type: 'text',
		name: 'in_url',
		placeholder: 'LinkedIn Profile Link',
		label: 'LinkedIn',
    inputmode: 'url'
	},
	{
		type: 'text',
		name: 'web_url',
		placeholder: 'Website Url',
		label: 'Website',
    inputmode: 'url'
	}
];

// [type]=formInput.type
// [name]=formInput.name
// #inputRef='ngModel'
// [ngClass]={'is-invalid': (inputRef.touched || inputRef.dirty) && !inputRef.valid }
// [(ngModel)]=IFACustProfile[formInput.name]
// [placeholder]=formInput.placeholder
// [required]=formInput.isRequired
// [pattern]=formInput.pattern
// [attr.inputmode]=formInput.inputmode || 'none'
// [maxlength]=formInput.maxlength || -1
