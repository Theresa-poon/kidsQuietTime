import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import {IonContent} from '@ionic/angular';

@Component({
  selector: 'app-gospel',
  templateUrl: './gospel.page.html',
  styleUrls: ['./gospel.page.scss'],
})
export class GospelPage implements OnInit {

  public pages: any; //array of available pages (e.g. 1,2,3,4,5,6,...)
  PageNum: any; //user input of page number to go to

  @ViewChild(IonContent, { read: IonContent, static: true }) content: IonContent;

  constructor(private router: Router,) { }

  ngOnInit() {
    this.pages = [1,2,3,4,5,6,7,8] //production copy should be up to 32 pages
    this.PageNum = 1
  }

  clickL() {
    this.router.navigate(['/main']);
  }

  ScrollTo() {
    let x = this.PageNum - 1
    let y = "Id"+x
    console.log("scrolling to: "+ x)
    //let yOffset = document.getElementById(element).offsetTop;
    let yOffset = document.getElementById(y).offsetTop;
    console.log("yOffset is: "+yOffset)
    this.content.scrollToPoint(0, yOffset, 3000)
  }

}
