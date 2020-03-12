import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApptextService } from '../apptext.service';
import { GamesService } from '../games.service';
import { AlertController } from '@ionic/angular'; 
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-game6',
  templateUrl: './game6.page.html',
  styleUrls: ['./game6.page.scss'],
})
export class Game6Page implements OnInit {

  public gameQ1 = []; //json data of 3 LHS sentences
  public gameQ2 = []; //json data of 3 RHS sentences
  public gameQ2current = []; //current order of 3 RHS sentences
  public gameA = []; //json data of order of 3 RHS sentences
  heightControl: any; //css class of row height (increase height for tablets)
  buttonControl: any; //css class of button height (increase height for tablets)
  gameText: any; //css class of text width (increase width for shorter screens)
  //public chosenL = []; //storing user clicked item on the left
  //public chosenR = []; //storing user clicked item on the right

  constructor(private router: Router,
    public apptextService: ApptextService,
    public gamesService: GamesService,
    public alertController: AlertController,
    private platform: Platform,) { }

  ionViewWillEnter() {
    this.heightControl = 'heightControl2'
    if (this.platform.is('tablet')) { //set css class for tablet or phone
      this.heightControl = 'heightControl1'
      this.buttonControl = 'buttonControl1'
      
    } else {
      this.heightControl = 'heightControl2'
      this.buttonControl = 'buttonControl2'
      
    }
  }

  ngOnInit() {
    if (this.gamesService.ratio < 1.8) {
      this.gameText = 'gameText1'
    } else {
      this.gameText = 'gameText2'
    }
    this.gameQ1 = this.apptextService.currentText.game6Q1.split(",")
    this.gameQ2 = this.apptextService.currentText.game6Q2.split(",")
    this.gameA = this.apptextService.currentText.game6A.split(",")
    if (this.gamesService.correctMatch == 0) {
      let n = 0
      for (n = 0; n < this.gameQ2.length; n++) {
        this.gameQ2current[n] = this.gameQ2[this.gameA[n]]
      }
    } else {
      let n = 0
      for (n = 0; n < this.gameQ2.length; n++) {
        this.gameQ2current[n] = this.gameQ2[n]
      }
    }
    //this.chosenL = [0,0,0]
    //this.chosenR = [0,0,0]
  }

  //when an item is chosen from the LHS ; chosenL & chosenR arrays are set according to:
  //  [0,0,0] never selected
  //  [1,2,3] selected but not matched
  //  [11,12,13] matched
  //checkL(j) {
  //if (this.chosenL[j] == 0) {
  //  if (this.chosenR[0] != 1 && this.chosenR[1] != 2 && this.chosenR[2] != 3) {
  //    this.chosenL[j] = j+1 // e.g.if 3rd item on left chosen, [0,0,3]
  //    let x = 0
  //    for (x = 0; x < this.chosenL.length; x++) {
  //      if (x != j && this.chosenL[x] != 11 && this.chosenL[x] != 12 && this.chosenL[x] != 13) {
  //        this.chosenL[x] = 0
  //      }
  //    }
  //  }
  //  if (this.chosenR[0] == 1 || this.chosenR[1] == 2 || this.chosenR[2] == 3) {
  //    if (this.chosenR[j] != 0) {
  //      this.chosenL[j] = j + 11
  //      this.chosenR[j] = this.chosenR[j] + 10
  //      console.log(this.chosenL)
  //      console.log(this.chosenR)
  //    }
  //  }
  //}  
  //}

  //when an item is selected form the RHS
  // note that chosenR array is arranged according to json game6Q2 order
  //checkR(k) {
    //this.chosenR = [0,0,0]
    //this.chosenR[k] = parseInt(k)+1 // e.g. if matching item for 3rd item on left chosen, [0,0,3]
    //console.log(this.chosenR)
    //if (this.chosenR[k] == 0) {
    //  if (this.chosenL[0] != 1 && this.chosenL[1] != 2 && this.chosenL[2] != 3) {
    //    this.chosenR[k] = parseInt(k)+1 // e.g.if 3rd item in json chosen, [0,0,3]
    //    let x = 0
    //    for (x = 0; x < this.chosenR.length; x++) {
    //      if (x != k && this.chosenR[x] != 11 && this.chosenR[x] != 12 && this.chosenR[x] != 13) {
    //        this.chosenR[x] = 0
    //      }
    //    }
    //  }
    //  if (this.chosenL[0] == 1 || this.chosenL[1] == 2 || this.chosenL[2] == 3) {
    //    if (this.chosenL[k] != 0) { //matched
    //      this.chosenR[k] = parseInt(k) + 11
    //      this.chosenL[k] = this.chosenL[k] + 10
    //      console.log(this.chosenL)
    //      console.log(this.chosenR)
    //    }
    //  }
    //}   
  //}

  reorderItems(event)
  {
    console.log("before: "+this.gameQ2current)
    console.log(event);
    console.log(`Moving item from ${event.detail.from} to ${event.detail.to}`);
    const itemMove = this.gameQ2current.splice(event.detail.from, 1)[0];
    this.gameQ2current.splice(event.detail.to, 0, itemMove);
    event.detail.complete();
    console.log("after: "+this.gameQ2current)
    console.log("correct answer: "+this.gameQ2)
    console.log(this.gameQ2.toString() == this.gameQ2current.toString())
    if (this.gameQ2.toString() == this.gameQ2current.toString()) {
      this.gamesService.correctMatch = 1
    }
  }


  clickL() {
    this.router.navigate(['/lesson-one']);
  }

  clickR() {

    //alert user if page not completed; route to next page if completed
    if (this.gamesService.reviewMode == 0) {
      // use same criterion as lesson3.ts to determine if page successfully completed
      if (this.gamesService.correctMatch == 1) {
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
