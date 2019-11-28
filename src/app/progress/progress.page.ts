import { Component, OnInit } from '@angular/core';
import { ApptextService } from '../apptext.service';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.page.html',
  styleUrls: ['./progress.page.scss'],
})
export class ProgressPage implements OnInit {

  //index: number = 0; //array index of current day eg. day 1, index=0
  public jsonAll = [];
  public mmData : any; 

  constructor(public apptextService: ApptextService,
    public storageService: StorageService,
    public gamesService: GamesService,
    private router: Router) { }

  ngOnInit() {
    this.apptextService.searchData()
    .subscribe(data => {
      this.jsonAll = data;
      this.jsonAll = this.jsonAll.slice(0, this.storageService.currentId_Date[0]);
      //this.apptextService.currentText = this.jsonAll[this.storageService.currentId_Date[0]];
      //this.apptextService.currentText = this.textAll[0];
      console.log(this.jsonAll);
      //console.log(this.jsonAll[0].title);
      });
  }

  review() {
    if(this.storageService.currentId_Date[0] != 0) {
      this.gamesService.reviewMode = this.mmData
      console.log("go to Day "+this.mmData)
      this.router.navigate(['/lesson-one']);
    }
    else {
      console.log("do nothing")
      console.log("mmData: "+this.mmData)
    }
  }

  clickL() {
    this.router.navigate(['/home']);
  }

}
