import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApptextService } from '../apptext.service';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-game2',
  templateUrl: './game2.page.html',
  styleUrls: ['./game2.page.scss'],
})
export class Game2Page implements OnInit {

  //varClass: string;
  public rowNumber = []; //number of rows in the grid
  public varClass = []; //array indicating which grid cell has been clicked by user
  public gameG = []; //json data of 36 words in grid
  public gameQ = []; //json data of words to be searched
  public gameA = []; //json data of grid positions with correct answers

  constructor(private router: Router,
    public apptextService: ApptextService,
    public gamesService: GamesService) { }

  ngOnInit() {
    this.rowNumber = [1,2,3,4,5,6]
    var i;
    for (i = 0; i < 36; i++) { 
      this.varClass[i] = ""
    }
    this.gameG = this.apptextService.currentText.game2G.split(",")
    this.gameQ = this.apptextService.currentText.game2Q.split(",")
    this.gameA = this.apptextService.currentText.game2A.split(",")
  }

  choose(index) {
    console.log("clicked "+index)
    if (this.varClass[index-1] == "") {
      this.varClass[index-1] = "red"
    } else {
      this.varClass[index-1] = ""
    }
    console.log("switches: "+this.varClass)
    console.log("canswers: "+this.gameA)
    if (this.gameA.toString() == this.varClass.toString()) {
      this.gamesService.correctGrid = 1
    }
  }

  clickL() {
    this.router.navigate(['/lesson-three']);
  }

  clickR() {
    this.router.navigate(['/lesson-last']);
  }

}
