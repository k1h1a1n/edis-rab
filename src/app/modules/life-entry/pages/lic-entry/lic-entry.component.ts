import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lic-entry',
  templateUrl: './lic-entry.component.html',
  styleUrls: ['./lic-entry.component.scss']
})
export class LicEntryComponent implements OnInit {

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
    'Current Status',
    'Nominee',
    'NACH & NEFT',
    'More Info',
    'Documents',
    'Notes',
  ]
  ipO = 20;
  ipT = 20;
  ipTh = 1000;
  ipF = 20;
  ipFi = 20;
  ipS = 2000;
  ipSe = 20;
  ipE = 20;
  ipN = 3000;

docTable = [{ "name": "Max", "age": "5", "country": "Anywhere" }]

  toggle = [
    'YES',
    'NO',
  ]
  ipO1: boolean;
  ipO2: boolean;
  ipO3: boolean;
  ipO4: boolean;
  ipO5: boolean;
  ipO6: boolean;
  ipO7: boolean;
  ipO8: boolean;
  ipO9: boolean;
  

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

Editable11() {
    this.ipO1 = true;
}
Editable12() {
  this.ipO2 = true;
}
Editable13() {
  this.ipO3 = true;
}
Editable21() {
  this.ipO4 = true;
}
Editable22() {
  this.ipO5 = true;
}
Editable23() {
  this.ipO6 = true;
}
Editable31() {
  this.ipO7 = true;
}
Editable32() {
  this.ipO8 = true;
}
Editable33() {
  this.ipO9 = true;
}


ip1(event){
this.ipO = event.target.value;
this.ipO1 = false;
}
ip2(event){
  this.ipT = event.target.value;
  this.ipO2 = false;
}
ip3(event){
    this.ipTh = event.target.value;
    this.ipO3 = false;
}
ip4(event){
      this.ipF = event.target.value;
      this.ipO4 = false;
}
ip5(event){
  this.ipFi = event.target.value;
  this.ipO5 = false;
}
ip6(event){
  this.ipS = event.target.value;
  this.ipO6 = false;
}
ip7(event){
  this.ipSe = event.target.value;
  this.ipO7 = false;
}
ip8(event){
  this.ipE = event.target.value;
  this.ipO8 = false;
}
ip9(event){
  this.ipN = event.target.value;
  this.ipO9 = false;
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
  this.activeState = state;
  if(this.activeState == 'Current Status'){
    this.current = true;
    this.nominee = false;
    this.neft = false;
    this.more = false;
    this.doc = false;
    this.notes = false;
  }
  if(this.activeState == 'Nominee'){
    this.current = false;
    this.nominee = true;
    this.neft = false;
    this.more = false;
    this.doc = false;
    this.notes = false;
  }
  if(this.activeState == 'NACH & NEFT'){
    this.current = false;
    this.nominee = false;
    this.neft = true;
    this.more = false;
    this.doc = false;
    this.notes = false;
  }
  if(this.activeState == 'More Info'){
    this.current = false;
    this.nominee = false;
    this.neft = false;
    this.more = true;
    this.doc = false;
    this.notes = false;
  }
  if(this.activeState == 'Documents'){
    this.current = false;
    this.nominee = false;
    this.neft = false;
    this.more = false;
    this.doc = true;
    this.notes = false;
  }
  if(this.activeState == 'Notes'){
    this.current = false;
    this.nominee = false;
    this.neft = false;
    this.more = false;
    this.doc = false;
    this.notes = true;
  }

}




}
