import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApptextService } from '../apptext.service';
import { GamesService } from '../games.service';
import { AlertController } from '@ionic/angular'; 

@Component({
  selector: 'app-game3',
  templateUrl: './game3.page.html',
  styleUrls: ['./game3.page.scss'],
})
export class Game3Page implements OnInit {

  public gameQ = []; //json data of n choices
  public gameP = []; //json data of n picture choices
  public gameA = []; //json data of m correct choices
  public choice = []; //user choices (only correct ones are stored)
  //public correctA = []; //array storing whether user chose the correct answer
  //public confetti: any; //triggers confetti if = 1

  constructor(private router: Router,
    public apptextService: ApptextService,
    public gamesService: GamesService,
    public alertController: AlertController,) { }

  ngOnInit() {
    if(this.apptextService.currentText.game3Q != null) {
      this.gameQ = this.apptextService.currentText.game3Q.split(",")
    }
    if(this.apptextService.currentText.game3P != null) {
      this.gameP = this.apptextService.currentText.game3P.split(",")
    }
    this.gameA = this.apptextService.currentText.game3A.split(",")
    console.log(this.gameQ)
    console.log(this.gameQ[0])
    console.log(this.gameQ[1])
    console.log(this.gameQ[2])
    //this.choice = [0,0,0,0,0,0,0,0]
    console.log("this.gamesService.correctChoice: "+this.gamesService.correctChoice)
    if (this.gamesService.correctChoice == 0) {
      var i;
      for (i = 0; i < this.gameA.length; i++) { 
        this.choice[i] = 0
      }
    } else {
      var i;
      for (i = 0; i < this.gameA.length; i++) { 
        this.choice[i] = this.gameA[i]
      }
    }
    console.log("this.choice: "+this.choice)
    //this.correctA = [0,0,0,0,0,0,0,0]
    //this.confetti = 0
  }

  check(i) {
    if(this.gameA[i] == 1) {
      //this.correctA[i] = 1
      this.choice[i] = 1
    }
    if (this.gameA.toString() == this.choice.toString()) {
      console.log("confetti!")
      this.gamesService.correctChoice = 1
      //this.confetti = 1
    }
  }

  //turnOff() {
  //  this.confetti = 0
  //}

  clickL() {
    if (this.apptextService.currentText.games.substring(0,1) != "3") {
      this.router.navigate(['/lesson-two']);
    } else {
      this.router.navigate(['/lesson-one']);
    }
  }

  clickR() {

  //alert user if page not completed; route to next page if completed
  if (this.gamesService.reviewMode == 0) {
    // use same criterion as lesson3.ts to determine if page successfully completed
    if (this.gamesService.correctChoice == 1) {
      console.log("Well done! Game completed!")
      //this.router.navigate(['/lesson-three']);
      if (this.apptextService.currentText.games.substring(0,1) != "3") {
        this.router.navigate(['/lesson-three']);
      } else {
        this.router.navigate(['/lesson-two']);
      }
    } else {
      console.log("Oops! Not yet completed ar!")
      this.presentConfirm('您還沒有完成這頁呢！', '您想完成這頁，令您可以獲得蘋果獎勵嗎？')
    }
  } else {
    //this.router.navigate(['/lesson-three']);
    if (this.apptextService.currentText.games.substring(0,1) != "3") {
      this.router.navigate(['/lesson-three']);
    } else {
      this.router.navigate(['/lesson-two']);
    }
  }    

    //if (this.apptextService.currentText.games.substring(0,1) != "3") {
      //this.router.navigate(['/lesson-three']);
    //} else {
      //this.router.navigate(['/lesson-two']);
    //}

  }

  async presentConfirm(title, content) {
    let alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [
        {
          text: '好的',
          role: 'cancel',
          handler: () => {
            console.log('取消 clicked');
          }
        },
        {
          text: '我想繼續下一頁',
          handler: () => {
            console.log('確定 clicked');
            //this.router.navigate(['/lesson-three']);
            if (this.apptextService.currentText.games.substring(0,1) != "3") {
              this.router.navigate(['/lesson-three']);
            } else {
              this.router.navigate(['/lesson-two']);
            }
          }
        }
      ]
    });
    await alert.present();
  }  

}
