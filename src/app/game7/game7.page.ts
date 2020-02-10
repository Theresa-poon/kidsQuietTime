import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApptextService } from '../apptext.service';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-game7',
  templateUrl: './game7.page.html',
  styleUrls: ['./game7.page.scss'],
})
export class Game7Page implements OnInit {

  public gameQ1 = []; //json data of words to be searched
  public gameQ2 = []; //json data of words to be searched
  public gameA1 = []; //json data of grid positions with correct answers
  public gameA2 = []; //json data of grid positions with correct answers
  public answer = []; //user input of answer
  keyboardHeight: any; 

  constructor(private router: Router,
    public apptextService: ApptextService,
    public gamesService: GamesService) { }

  ngOnInit() {

    window.addEventListener('native.keyboardshow', this.keyboardShowHandler);
    
    window.addEventListener('keyboardDidHide', () => {
      console.log("keyboard gone")
      document.getElementById("text").style.top="46%" //move text area back
      //document.getElementById("shape").style.display="hide" //move shape back
    });

    this.gameQ1 = this.apptextService.currentText.game7Q1.split(",")
    this.gameQ2 = this.apptextService.currentText.game7Q2.split(",")
    this.gameA1 = this.apptextService.currentText.game7A1.split(",")
    this.gameA2 = this.apptextService.currentText.game7A2.split(",")
    let x=0
    for (x = 0; x < this.gameA2.length; x++) {
      if(x == 0) {
        this.answer[x] = this.gameA2[x]
      } else {
        if (this.gamesService.correctCode == 1) { //display previously inputted correct answers
          this.answer[x] = this.gameA2[x]
        } else {
          this.answer[x] = ""
        }
      }
    }
    console.log(this.answer.toString() == this.gameA2.toString())
  }

  keyboardShowHandler(e) {
    this.keyboardHeight = e.keyboardHeight
    console.log("height: "+parseInt(this.keyboardHeight))
    console.log("is > 200? :"+(parseInt(this.keyboardHeight) > 200))
    if (parseInt(this.keyboardHeight) > 199) { // move text area above keyboard
      document.getElementById("text").style.top="16%"
      //document.getElementById("shape").style.display="show"
    } else {
      document.getElementById("text").style.top="34%"
      //document.getElementById("shape").style.display="show"
    }
  }

  clickL() {
    //store correct answers before page navigation within same day
    console.log("this.answer: "+this.answer)
    console.log("this.gameA2: "+this.gameA2)
    if (this.answer.toString() == this.gameA2.toString()) {
      this.gamesService.correctCode = 1
    } else {
      this.gamesService.correctCode = 0
    }
    if (this.apptextService.currentText.games.substring(0,1) != "7") {
      this.router.navigate(['/lesson-two']);
    } else {
      this.router.navigate(['/lesson-one']);
    }
  }

  clickR() {
    //store correct answers before page navigation within same day
    if (this.answer.toString() == this.gameA2.toString()) {
      this.gamesService.correctCode = 1
    } else {
      this.gamesService.correctCode = 0
    }
    if ( this.apptextService.currentText.games.substring(0,1) != "7") {
      this.router.navigate(['/lesson-three']);
    } else {
      this.router.navigate(['/lesson-two']);
    }
  }

}
