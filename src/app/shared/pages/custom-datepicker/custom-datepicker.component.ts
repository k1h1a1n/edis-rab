import { Component, Input, OnInit, AfterViewInit, Optional, Inject, ContentChild, Output, EventEmitter } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { NgModel, NG_VALUE_ACCESSOR, NG_VALIDATORS, NG_ASYNC_VALIDATORS } from '@angular/forms';
import * as moment from 'moment';

import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from './moment-date-adapter';
import { ElementBase } from '../custom-form/element-base';

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

let identifier = 0;

@Component({
  selector: 'custom-datepicker',
  templateUrl: './custom-datepicker.component.html',
  styleUrls: ['./custom-datepicker.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    {provide: NG_VALUE_ACCESSOR, useExisting: CustomDatepickerComponent, multi: true},
  ]
})
export class CustomDatepickerComponent extends ElementBase<string> {

  @Output() onDateChange = new EventEmitter();
  @Input() name = '';
  @Input() inputClass = '';
  @Input() placeholder = '';
  @Input() min : any;
  @ContentChild(NgModel) model : NgModel;

  public identifier = `custom-datepicker-${identifier++}`;

  constructor(
    @Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>
  ) {
    super(validators, asyncValidators);
    console.log('CustomDatepickerComponent constructor', this.model);
  }

  emitValue(value){
    if( value ){
      const _emitValue = value.format('YYYY-MM-DD');
      console.log('emitValue',value, _emitValue);
      this.onDateChange.emit(_emitValue);
    }
    else{
      this.onDateChange.emit('');
    }
  }
}
