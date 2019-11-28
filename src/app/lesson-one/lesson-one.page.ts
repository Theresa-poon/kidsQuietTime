import { Component, OnInit } from '@angular/core';
import { ApptextService } from '../apptext.service';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-lesson-one',
  templateUrl: './lesson-one.page.html',
  styleUrls: ['./lesson-one.page.scss'],
})
export class LessonOnePage implements OnInit {

  //index: number = 0; //array index of current day eg. day 1, index=0
  public textAll = [];

  constructor(public apptextService: ApptextService,
    private storageService: StorageService,
    public gamesService: GamesService,
    private router: Router) { }


    ngOnInit() {
      this.apptextService.searchData()
        .subscribe(data => {
          this.textAll = data;
          if (this.gamesService.reviewMode == 0) {
            this.apptextService.currentText = this.textAll[this.storageService.currentId_Date[0]];
          } else {
            this.apptextService.currentText = this.textAll[this.gamesService.reviewMode-1];
          } 
            //this.apptextService.currentText = this.textAll[0];
          console.log(this.textAll);
          console.log(this.apptextService.currentText);
          console.log(this.apptextService.currentText.id)
          });
      this.gamesService.initGame()
    }
  
    clickL() {
      this.router.navigate(['/home']);
    }
  
    clickR() {
      this.router.navigate(['/lesson-two']);
    }

}

