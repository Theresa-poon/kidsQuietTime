import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { GamesService } from '../games.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lesson-last',
  templateUrl: './lesson-last.page.html',
  styleUrls: ['./lesson-last.page.scss'],
})
export class LessonLastPage implements OnInit {

  constructor(private storageService: StorageService,
    public gamesService: GamesService,
    private router: Router) { }

  ngOnInit() {
  }

  updateOrNot() {
    if (this.gamesService.reviewMode == 0) {
      this.update();
    } else {
      this.router.navigate(['/home']);
    }
  }

  update() {
    // calculate dates
    this.storageService.currentId_Date[0] = this.storageService.currentId_Date[0]+1; //number of days done quiet time
    var n = new Date();
    var d = n.getDate();
    var m = n.getMonth();
    var y = n.getFullYear();
    console.log("today: "+d+"-"+m+"-"+y)
    var ytd = new Date(n.valueOf() - 1000*3600*24)
    var ytd_d = ytd.getDate();
    var ytd_m = ytd.getMonth();
    var ytd_y = ytd.getFullYear();
    console.log("yesterday: "+ytd_d+"-"+ytd_m+"-"+ytd_y)
    if ( (ytd_d == this.storageService.currentId_Date[1] && ytd_m == this.storageService.currentId_Date[2] && ytd_y == this.storageService.currentId_Date[3] 
          || (this.storageService.currentId_Date[1] == 0 && this.storageService.currentId_Date[2] == 0 && this.storageService.currentId_Date[3] == 0))) {
        console.log("will add 1 to continuous days")
        this.storageService.currentId_Date[4] = this.storageService.currentId_Date[4] + 1
    } else {
      if (d != this.storageService.currentId_Date[1] || m != this.storageService.currentId_Date[2] || y != this.storageService.currentId_Date[3]) {
        console.log("will reset continuous days to 1")
        this.storageService.currentId_Date[4] = 1
      }
      console.log("will do nothing")
    }
    this.storageService.currentId_Date[1] = d;
    this.storageService.currentId_Date[2] = m;
    this.storageService.currentId_Date[3] = y;
    console.log(d+"-"+m+"-"+y)

    //calculate score
    var s = parseInt(this.storageService.currentId_Date[5])
    s = s+100; //each done day = 100
    s = s+20*this.gamesService.correctFill[0]
          +20*this.gamesService.correctFill[1]
          +20*this.gamesService.correctFill[2]
          +60*this.gamesService.correctGrid
          +60*this.gamesService.correctDraw
    //if (this.gamesService.correctFill[0] == 0 && this.gamesService.correctFill[1] == 0 && this.gamesService.correctFill[2] == 0) {
    //  console.log("if 'all wrong', zero score")
    //} else {
    //  if (this.gamesService.correctFill[0] == 1 && this.gamesService.correctFill[1] == 1 && this.gamesService.correctFill[2] == 1) {
    //    s = s+60; //all correct exercise = 60
    //  } else {
    //    s = s+30; //part correct exercise = 30
    //  }
    //}
    console.log(s)
    this.storageService.currentId_Date[5] = s.toString()

    //update local storage
    console.log("updating local storage: "+this.storageService.currentId_Date)
    this.storageService.updateItem(this.storageService.currentId_Date);
    this.router.navigate(['/home']);
  }

}
