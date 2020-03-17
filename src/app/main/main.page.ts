import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {
  }

  Information() {
    console.log("go to information")
    //this.router.navigate(['/information']);
  }

  gospel() {
    console.log("go to gospel")
    //this.router.navigate(['/gospel']);
  }

  quiettime() {
    console.log("go to menu")
    this.router.navigate(['/menu']);
  }

}
