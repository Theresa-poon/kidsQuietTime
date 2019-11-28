import { Component, OnInit } from '@angular/core';
import { ApptextService } from '../apptext.service';
import { Router } from '@angular/router';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-lesson-two',
  templateUrl: './lesson-two.page.html',
  styleUrls: ['./lesson-two.page.scss'],
})
export class LessonTwoPage implements OnInit {

  constructor(public apptextService: ApptextService,
    public gamesService: GamesService,
    private router: Router) { }

  ngOnInit() {
  }

  clickL() {
    this.router.navigate(['/lesson-one']);
  }

  clickR() {
    // route to the first game indicated in text.json
    this.gamesService.routeGame("1")
  }

}
