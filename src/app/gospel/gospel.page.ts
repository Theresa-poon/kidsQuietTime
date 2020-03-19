import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gospel',
  templateUrl: './gospel.page.html',
  styleUrls: ['./gospel.page.scss'],
})
export class GospelPage implements OnInit {

  public pages: any; //array of available pages (e.g. 1,2,3,4,5,6,...)

  constructor() { }

  ngOnInit() {
    this.pages = [1,2,3,4,5,6,7,8] //production copy should be up to 32 pages
  }

}
