import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApptextService } from '../apptext.service';
import { GamesService } from '../games.service';
import { AlertController } from '@ionic/angular'; 

@Component({
  selector: 'app-game5',
  templateUrl: './game5.page.html',
  styleUrls: ['./game5.page.scss'],
})
export class Game5Page implements OnInit {

  public gameA1 = []; //json data of choices for Q1
  public gameA2 = []; //json data of choices for Q2
  public gameA3 = []; //json data of choices for Q3
  public choice : any; 

  constructor(private router: Router,
    public apptextService: ApptextService,
    public gamesService: GamesService,
    public alertController: AlertController) {}

  ngOnInit() {
    this.gameA1 = this.apptextService.currentText.game5A1.split(",")
    console.log("before shift: "+this.gameA1)
    this.gameA2 = this.apptextService.currentText.game5A2.split(",")
    this.gameA3 = this.apptextService.currentText.game5A3.split(",")
    this.gameA1.shift()
    this.gameA2.shift()
    this.gameA3.shift()
    console.log("after shift: "+this.gameA1)
    // in case there are only 2 questions
    if (this.gameA3.length == 0) {
      this.gamesService.correctMCQ[2] = 1
    }
  }

  check1(i) {
    console.log("i is:"+i)
    if (i == this.apptextService.currentText.game5A1.substring(0,1)) {
      console.log("correct answer!")
      this.gamesService.correctMCQ[0] = 1
    }
  }

  //for choosing most favourite option
  check1A(i) {
    console.log("i is:"+i)
      this.gamesService.correctMCQ[0] = i+1
      console.log("this.gamesService.correctMCQ[0]: "+this.gamesService.correctMCQ[0])
  }

  check2(i) {
    console.log("i is:"+i)
    if (i == this.apptextService.currentText.game5A2.substring(0,1)) {
      console.log("correct answer!")
      this.gamesService.correctMCQ[1] = 1
    }
  }

  check3(i) {
    console.log("i is:"+i)
    if (i == this.apptextService.currentText.game5A3.substring(0,1)) {
      console.log("correct answer!")
      this.gamesService.correctMCQ[2] = 1
    }
  }

  clickL() {
    this.router.navigate(['/lesson-one']);
  }

  clickR() {
    this.router.navigate(['/lesson-two']);
  }

}
