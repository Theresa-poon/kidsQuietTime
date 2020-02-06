import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookinfo',
  templateUrl: './bookinfo.page.html',
  styleUrls: ['./bookinfo.page.scss'],
})
export class BookinfoPage implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {
  }

  clickL() {
    this.router.navigate(['/menu']);
  }

}
