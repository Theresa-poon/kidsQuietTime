import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-corona',
  templateUrl: './corona.page.html',
  styleUrls: ['./corona.page.scss'],
})
export class CoronaPage implements OnInit {

  public togglev: any; // "0" if gospel brochures details not shown, otherwise "1"
  public toggleq: any;

  constructor(private router: Router,
    public gamesService: GamesService,) { }

  ngOnInit() {
    this.togglev = 0
    this.toggleq = 0
  }

  togglev1() {
    //"0" if gospel brochure details not shown, otherwise "1"
    this.togglev = 1
  }

  togglev0() {
    //"0" if gospel brochure details not shown, otherwise "1"
    this.togglev = 0
  }

  toggleq1() {
    //"0" if quiet time book details not shown, otherwise "1"
    this.toggleq = 1
  }

  toggleq0() {
    //"0" if quiet time details not shown, otherwise "1"
    this.toggleq = 0
  }

  doctor() {
    console.log("go to doctor")
    this.gamesService.currentCorona = "Doctor"
    console.log("page is = "+this.gamesService.currentCorona)
    this.router.navigate(['/brochure']);
  }

  why() {
    console.log("go to why")
    this.gamesService.currentCorona = "Why"
    console.log("page is = "+this.gamesService.currentCorona)
    this.router.navigate(['/brochure']);
  }

}
