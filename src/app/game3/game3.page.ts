import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game3',
  templateUrl: './game3.page.html',
  styleUrls: ['./game3.page.scss'],
})
export class Game3Page implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  clickL() {
    this.router.navigate(['/lesson-two']);
  }

  clickR() {
    this.router.navigate(['/lesson-three']);
  }

}
