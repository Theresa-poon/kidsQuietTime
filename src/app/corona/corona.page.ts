import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-corona',
  templateUrl: './corona.page.html',
  styleUrls: ['./corona.page.scss'],
})
export class CoronaPage implements OnInit {

  constructor(private router: Router,
    public gamesService: GamesService,) { }

  ngOnInit() {
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
