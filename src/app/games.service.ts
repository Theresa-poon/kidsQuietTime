import { Injectable } from '@angular/core';
import { ApptextService } from './apptext.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  correctFill: any; //whether answers are correct for fill-in-the-blanks game (game1)
  correctGrid: any; //whether answers are correct for grid game (game2)
  correctChoice: any; //whether answers are correct for choosing game (game3)
  correctDraw: any; //whether drawing has been saved (game4)
  correctMCQ: any; //whether MCQ answers are correct (game5)
  correctMatch: any; //whether matching answers are correct (game6)
  correctCode: any; //whether code is solved (game6)
  picture: any; //temporary storage for most current picture saved
  reviewMode: any; //whether the user is reviewing the material (instead of doing the quiet time for the first time)
  ratio: any; //screen width divided by height

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
   // if (this.reviewMode == 0) {
      console.log("in initGame, not reviewMode")
      this.correctFill = [0,0,0,0]  //initialize game 1
      this.correctGrid = 0  //initialize game 2
      this.correctChoice = 0 //initialize game 3
      this.correctDraw = 0  //initialize game 4
      this.correctMCQ = [0,0,0] //initialize game 5 [1,1,1] or [1.0.0] or [2,0,0] or [3,0,0]
      this.correctMatch = 0 //initialize game 6
      this.correctCode = 0 //initialize game 7
      this.picture = ""
      console.log(this.correctFill[0]+","+this.correctFill[1]+","+this.correctFill[2])
    //} else {
     // console.log("in initGame, reviewMode")
      //this.correctFill = [1,1,1]
      //this.correctGrid = 1
      //this.correctDraw = 0
    //}
  }

}
