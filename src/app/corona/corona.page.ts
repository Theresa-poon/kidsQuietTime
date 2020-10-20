import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-corona',
  templateUrl: './corona.page.html',
  styleUrls: ['./corona.page.scss'],
})
export class CoronaPage implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {
  }

  doctor() {
    console.log("go to doctor")
    //this.router.navigate(['/gospel']);
  }

  why() {
    console.log("go to why")
    //this.router.navigate(['/gospel']);
  }

}
