import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { StorageService } from '../storage.service';
import { ApptextService } from '../apptext.service';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.page.html',
  styleUrls: ['./title.page.scss'],
})
export class TitlePage implements OnInit {

  public textAll = [];

  constructor(private storage: Storage,
    private storageService: StorageService,
    public apptextService: ApptextService,
    public gamesService: GamesService,
    private router: Router) { }

  ngOnInit() {
    this.apptextService.searchData()
    .subscribe(data => {
      this.textAll = data;
      if (this.gamesService.reviewMode == 0) {
        this.apptextService.currentText = this.textAll[this.storageService.currentPages[this.storageService.v-1]];
      } else {
        this.apptextService.currentText = this.textAll[this.gamesService.reviewMode-1];
      } 
        //this.apptextService.currentText = this.textAll[0];
      console.log(this.textAll);
      console.log(this.apptextService.currentText);
      //console.log(this.apptextService.currentText.id)
      });
  this.gamesService.initGame()
  }

  clickL() {
    this.router.navigate(['/menu']);
  }
  
  clickR() {
    this.router.navigate(['/lesson-one']);
  }  

}
