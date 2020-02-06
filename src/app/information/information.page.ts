import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss'],
})
export class InformationPage implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {
  }

  bookinfo() {
    console.log("going to information-book page...")
    this.router.navigate(['/bookinfo']);
  }

  parents() {
    console.log("going to information-parents page...")
    this.router.navigate(['/parent']);
  }

  how() {
    console.log("going to information-how page...")
    this.router.navigate(['/use']);
  }

  clickL() {
    this.router.navigate(['/menu']);
  }

}