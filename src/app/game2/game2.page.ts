import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApptextService } from '../apptext.service';
import { GamesService } from '../games.service';
import { AlertController } from '@ionic/angular'; 

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
    public gamesService: GamesService,
    public alertController: AlertController) { }

  ngOnInit() {
    this.gameG = this.apptextService.currentText.game2G.split(",")
    this.gameQ = this.apptextService.currentText.game2Q.split(",")
    this.gameA = this.apptextService.currentText.game2A.split(",")
    if (this.gameG.length == 36) {
      this.rowNumber = [1,2,3,4,5,6]
      var i;
      for (i = 0; i < 36; i++) { 
        this.varClass[i] = ""
      }
    }
    if (this.gameG.length == 49) {
      this.rowNumber = [1,2,3,4,5,6,7]
      var i;
      for (i = 0; i < 49; i++) { 
        this.varClass[i] = ""
      }
    }
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
    this.router.navigate(['/lesson-two']);
  }

  clickR() {
    //alert user if page not completed; route to next page if completed
    if (this.gamesService.reviewMode == 0) {
      // use same criterion as lesson3.ts to determine if page successfully completed
      if (this.gamesService.correctGrid == 1) {
        console.log("Well done! Game completed!")
        this.router.navigate(['/lesson-three']);
      } else {
        console.log("Oops! Not yet completed ar!")
        this.presentConfirm('您還沒有完成這頁呢！', '您想完成這頁，令您可以獲得蘋果獎勵嗎？')
      }
    } else {
      this.router.navigate(['/lesson-three']);
    }

    //this.router.navigate(['/lesson-three']);
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
            this.router.navigate(['/lesson-three']);
          }
        }
      ]
    });
    await alert.present();
  }  

}
