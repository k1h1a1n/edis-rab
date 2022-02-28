import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-custom-menu',
  templateUrl: './custom-menu.component.html',
  styleUrls: ['./custom-menu.component.scss']
})
export class CustomMenuComponent implements OnInit {

  data : any;
  constructor(private router: Router) {
    this.data = this.router.getCurrentNavigation()?.extras?.state;
  }

  ngOnInit(): void {
    const labelHdr = document.getElementById('lblHeader');
    if(labelHdr)
    {
      labelHdr.innerText = this.data?.title || 'Custom Menu';
    }
  }

}
