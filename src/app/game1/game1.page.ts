import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApptextService } from '../apptext.service';
import { GamesService } from '../games.service';
import { AlertController } from '@ionic/angular'; 

@Component({
  selector: 'app-game1',
  templateUrl: './game1.page.html',
  styleUrls: ['./game1.page.scss'],
})
export class Game1Page implements OnInit {

  public gameQ = []; //json data of 3 questions
  public gameA = []; //json data of 3 answers
  Aone: string; //user input of first answer
  Atwo: string; //user input of second answer
  Athree: string; //user input of third answer
  Afour: string; //user input of fourth answer
  keyboardHeight: any; 

  constructor(private router: Router,
    public apptextService: ApptextService,
    public gamesService: GamesService,
    public alertController: AlertController,) { }

  ngOnInit() {
    
    window.addEventListener('native.keyboardshow', this.keyboardShowHandler);
    
    window.addEventListener('keyboardDidHide', () => {
      console.log("keyboard gone")
      document.getElementById("textArea").style.top="50%" //move text area back
    });

    this.gameQ = this.apptextService.currentText.game1Q.split(",")
    this.gameA = this.apptextService.currentText.game1A.split(",")
    console.log(this.gameQ)
    console.log(this.gameQ[0])
    console.log(this.gameQ[1])
    console.log(this.gameQ[2])
    console.log(this.gameQ[3])
    console.log("gameA[3]: "+this.gameA[3])
    //display previously inputted correct answers
    if (this.gamesService.correctFill[0] == 1) {
      this.Aone = this.gameA[0]
    }
    if (this.gamesService.correctFill[1] == 1) {
      this.Atwo = this.gameA[1]
    }
    if (this.gamesService.correctFill[2] == 1 && this.gameA[2] != null) {
      this.Athree = this.gameA[2]
    }
    if (this.gamesService.correctFill[3] == 1 && this.gameA[3] != null) {
      this.Afour = this.gameA[3]
    }
    //if there are only 2 or 3 questions, set the other questions to be correctly answered
    if (this.gameA[2] == null) {
      this.gamesService.correctFill[2] = 1
    }
    if (this.gameA[3] == null) {
      this.gamesService.correctFill[3] = 1
    }
  }

  keyboardShowHandler(e) {
    this.keyboardHeight = e.keyboardHeight
    console.log("height: "+parseInt(this.keyboardHeight))
    console.log("is > 200? :"+(parseInt(this.keyboardHeight) > 200))
    if (parseInt(this.keyboardHeight) > 200) { // move text area above keyboard
      document.getElementById("textArea").style.top="16%"
    } else {
      document.getElementById("textArea").style.top="32%"
    }
  }

  //check() {
  //  if (this.gameA[0] == this.Aone) {
  //    this.gamesService.correctFill[0] = 1
  //  }
  //  if (this.gameA[1] == this.Atwo) {
  //    this.gamesService.correctFill[1]  = 1
  //  }
  //  if (this.gameA[2] == this.Athree) {
  //    this.gamesService.correctFill[2]  = 1
  //  }
  //  if (this.gamesService.correctFill[0] == 0 && this.gamesService.correctFill[1] == 0 && this.gamesService.correctFill[2] == 0) {
  //    console.log("if 'all wrong' is correct")
  //    this.presentAlert('加油 !','你可以翻閱之前的經文和延伸閱讀啊')
  //  }
  //  console.log("correctness: "+this.gamesService.correctFill[0]+", "+this.gamesService.correctFill[1] +", "+this.gamesService.correctFill[2])
  //}

  //async presentAlert(title: string, content:string) {
  //  const alert = await this.alertController.create({
  //    header: title,
  //    message: content,
  //    buttons: ["OK"]
  //  })
  //  await alert.present()
  //}

  clickL() {
    //store correct answers before page navigation within same day
    if (this.gameA[0] == this.Aone) {
      this.gamesService.correctFill[0] = 1
    } else {
      this.gamesService.correctFill[0] = 0
    }
    if (this.gameA[1] == this.Atwo) {
      this.gamesService.correctFill[1]  = 1
    } else {
      this.gamesService.correctFill[1] = 0
    }
    if (this.gameA[2] == this.Athree) {
      this.gamesService.correctFill[2]  = 1
    } else {
      this.gamesService.correctFill[2] = 0
    }
    if (this.gameA[3] == this.Afour) {
      this.gamesService.correctFill[3]  = 1
    } else {
      this.gamesService.correctFill[3] = 0
    }
    console.log("correctFill is: "+this.gamesService.correctFill)
    this.router.navigate(['/lesson-one']);
  }

  clickR() {
    //store correct answers before page navigation within same day
    if (this.gameA[0] == this.Aone) {
      this.gamesService.correctFill[0] = 1
    } else {
      this.gamesService.correctFill[0] = 0
    }
    if (this.gameA[1] == this.Atwo) {
      this.gamesService.correctFill[1]  = 1
    } else {
      this.gamesService.correctFill[1] = 0
    }
    if (this.gameA[2] == this.Athree) {
      this.gamesService.correctFill[2]  = 1
    } else {
      this.gamesService.correctFill[2] = 0
    }
    if (this.gameA[3] == this.Afour) {
      this.gamesService.correctFill[3]  = 1
    } else {
      this.gamesService.correctFill[3] = 0
    }
    console.log("correctFill is: "+this.gamesService.correctFill)
    this.router.navigate(['/lesson-two']);
  }

}
