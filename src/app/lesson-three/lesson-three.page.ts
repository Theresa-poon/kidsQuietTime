import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-lesson-three',
  templateUrl: './lesson-three.page.html',
  styleUrls: ['./lesson-three.page.scss'],
})
export class LessonThreePage implements OnInit {

  constructor(private router: Router,
    public gamesService: GamesService) { }

  ngOnInit() {
  }

  clickL() {
    // route to the first game indicated in text.json
    this.gamesService.routeGame("1")
  }

  clickR() {
    // route to the second game indicated in text.json
    this.gamesService.routeGame("2")
  }

}
