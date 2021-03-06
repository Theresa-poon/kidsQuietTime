import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApptextService } from '../apptext.service';
import { GamesService } from '../games.service';
import { AlertController } from '@ionic/angular'; 
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';

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
  inputA: any; //css class of input box (increase height for tablets)

  constructor(private router: Router,
    public apptextService: ApptextService,
    public gamesService: GamesService,
    public alertController: AlertController,
    private statusBar: StatusBar,
    private platform: Platform,) { }

  ionViewWillEnter() {
    if (this.platform.is('tablet')) { //set css class for tablet or phone
      this.inputA = 'inputA1'
    } else {
      this.inputA = 'inputA2'
    }
  }

  ngOnInit() {
    
    window.addEventListener('native.keyboardshow', this.keyboardShowHandler);
    
    window.addEventListener('keyboardDidHide', () => {
      console.log("keyboard gone")
      document.getElementById("textArea").style.top="55%" //move text area back
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
    if (parseInt(this.keyboardHeight) > 199) { // move text area above keyboard
      document.getElementById("textArea").style.top="10%"
    } else {
      if (parseInt(this.keyboardHeight) > 149) {
        document.getElementById("textArea").style.top="16%"
      } else {
      document.getElementById("textArea").style.top="30%"
      }
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
      //console.log("this.gameA[3] is: "+this.gameA[3])
      //console.log("this.Afour is: "+this.Afour)
      //console.log("this.gameA[3] == this.Afour")
    } else {
      this.gamesService.correctFill[3] = 0
    }
    console.log("correctFill is: "+this.gamesService.correctFill)

    //alert user if page not completed; route to next page if completed
    if (this.gamesService.reviewMode == 0) {
      // use same criterion as lesson3.ts to determine if page successfully completed
      if (this.gamesService.correctFill[0] * this.gamesService.correctFill[1] * this.gamesService.correctFill[2] * this.gamesService.correctFill[3] == 1) {
        console.log("Well done! Game completed!")
        this.router.navigate(['/lesson-two']);
      } else {
        console.log("Oops! Not yet completed ar!")
        this.presentConfirm('您還沒有完成這頁呢！', '您想完成這頁，令您可以獲得蘋果獎勵嗎？')
      }
    } else {
      this.router.navigate(['/lesson-two']);
    }

    //this.router.navigate(['/lesson-two']);

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
            this.router.navigate(['/lesson-two']);
          }
        }
      ]
    });
    await alert.present();
  }

}
