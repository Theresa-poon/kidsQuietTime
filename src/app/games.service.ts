import { Injectable } from '@angular/core';
import { ApptextService } from './apptext.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  correctFill: any; //whether answers are correct for fill-in-the-blanks game
  correctGrid: any; //whether answers are correct for grid game
  correctDraw: any; //whether drawing has been saved
  picture: any; //temporary storage for most current picture saved
  reviewMode: any; //whether the user is reviewing the material (instead of doing the quiet time for the first time)

  constructor(private apptextService: ApptextService,
    private router: Router) { }

  routeGame(index) {
    console.log("index= ", index)
    console.log("path= ", "/game"+this.apptextService.currentText.games.substring(index-1, index))
    var route = "/game"+this.apptextService.currentText.games.substring(index-1, index)
    //var route = "/game1"
    this.router.navigate([route])
    //this.router.navigate(['/game1'])
  }

  //initialize all answers to be false for fill-in-the-blank game
  initGame() {
    if (this.reviewMode == 0) {
      console.log("in initGame, not reviewMode")
      this.correctFill = [0,0,0]
      this.correctGrid = 0
      this.correctDraw = 0
      this.picture = ""
      console.log(this.correctFill[0]+","+this.correctFill[1]+","+this.correctFill[2])
    } else {
      console.log("in initGame, reviewMode")
      this.correctFill = [1,1,1]
      this.correctGrid = 1
      this.correctDraw = 0
    }
  }

}
