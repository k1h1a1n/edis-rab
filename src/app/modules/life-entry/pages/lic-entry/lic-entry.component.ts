import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lic-entry',
  templateUrl: './lic-entry.component.html',
  styleUrls: ['./lic-entry.component.scss']
})
export class LicEntryComponent implements OnInit {
  activeTab: any;
  active: boolean;
  found: boolean;

  constructor() { }
  ngOnInit(): void {
  }
  advance = false;
  current = false;
  nominee = false;
  neft = false;
  more = false;
  doc = false;
  notes = false;
  activeState = 'Current Status';
  togglestate = 'YES'
  states = [
   { 'tab':'Current Status'},
    {'tab':'Nominee'},
    {'tab':'NACH & NEFT'},
    {"tab":'More Info'},
    {'tab':'Documents'},
    {'tab':'Notes'},
  ]
docTable = [{ "name": "Max", "age": "5", "country": "Anywhere" }]

  toggle = [
    'YES',
    'NO',
  ]

    addRow() {    
   this.docTable.push({ "name": "M", "age": "4", "country": "Anywhere" })
      console.log(this.docTable);
  }


  deleteRow(index) {  
    if(this.docTable.length ==1) {  
        return false;  
    } else {  
        this.docTable.splice(index, 1);  
        return true;  
    }  
}

  toggleActive(state){
    this.togglestate = state;
  }

  showAdv(event){
  if ( event.target.checked ) {
      this.advance = true;
      this.current = true;
      this.nominee = false;
      this.neft = false;
      this.more = false;
      this.doc = false;
      this.notes = false;
      this.activeState = 'Current Status';
 }
 if (!event.target.checked){
  this.advance = false;
  this.current = false;
  this.nominee = false;
  this.neft = false;
  this.more = false;
  this.doc = false;
  this.notes = false;
 }
 
  }


setStateAsActive(state) {
  this.states.forEach(result => {
    console.log(state ,result, 'State')
    if(result === state){
      result['active'] = true;
      console.log(state ,result, 'if');
    }
    else{
      result['active'] = false;
      console.log(state ,result, 'else')
    }
    console.log(result['active'] , 'result')
  })
  // if(this.activeState == 'Current Status'){
  //   this.current = true;
  //   this.nominee = false;
  //   this.neft = false;
  //   this.more = false;
  //   this.doc = false;
  //   this.notes = false;
  // }
  // if(this.activeState == 'Nominee'){
  //   this.current = false;
  //   this.nominee = true;
  //   this.neft = false;
  //   this.more = false;
  //   this.doc = false;
  //   this.notes = false;
  // }
  // if(this.activeState == 'NACH & NEFT'){
  //   this.current = false;
  //   this.nominee = false;
  //   this.neft = true;
  //   this.more = false;
  //   this.doc = false;
  //   this.notes = false;
  // }
  // if(this.activeState == 'More Info'){
  //   this.current = false;
  //   this.nominee = false;
  //   this.neft = false;
  //   this.more = true;
  //   this.doc = false;
  //   this.notes = false;
  // }
  // if(this.activeState == 'Documents'){
  //   this.current = false;
  //   this.nominee = false;
  //   this.neft = false;
  //   this.more = false;
  //   this.doc = true;
  //   this.notes = false;
  // }
  // if(this.activeState == 'Notes'){
  //   this.current = false;
  //   this.nominee = false;
  //   this.neft = false;
  //   this.more = false;
  //   this.doc = false;
  //   this.notes = true;
  // }

}




}
