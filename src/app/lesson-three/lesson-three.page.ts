import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApptextService } from '../apptext.service';
import { StorageService } from '../storage.service';
import { GamesService } from '../games.service';
import { AlertController } from '@ionic/angular'; 

@Component({
  selector: 'app-lesson-three',
  templateUrl: './lesson-three.page.html',
  styleUrls: ['./lesson-three.page.scss'],
})
export class LessonThreePage implements OnInit {

  v: any; //current book volume
  pages: any; //array containing pages done in each book volume
  //pagesTotal: any;
  fmgameNumber: any;

  constructor(private router: Router,
    public apptextService: ApptextService,
    public storageService: StorageService,
    public gamesService: GamesService,
    public alertController: AlertController,) { }

  ngOnInit() {
    this.fmgameNumber = this.apptextService.currentText.games.substring(1,2)
    console.log("gameNumber= "+this.fmgameNumber)
    console.log("this.storageService.v= "+this.storageService.v)
  }

  updateOrNot() {
    if (this.gamesService.reviewMode == 0) {
      this.update();
    } else {
      this.router.navigate(['/menu']);
    }
  }

  update() {
    // update number of days done quiet time
    this.pages = this.storageService.currentPages;
    this.v = this.storageService.v
    //this.v = 1+Math.floor((this.pages[0]+this.pages[1]+this.pages[2]+this.pages[3]+this.pages[4]+this.pages[5]+this.pages[6]+this.pages[7]+this.pages[8]+this.pages[9]+this.pages[10]+this.pages[11])/30)
    console.log("current volume = "+this.v)
    //this.storageService.currentId_Date[0] = this.storageService.currentId_Date[0]+1; 
    this.storageService.currentPages[this.v-1] = this.storageService.currentPages[this.v-1]+1; 
    console.log("update pages to = "+this.storageService.currentPages[this.v-1])

  //calculate score
    var apple = 0
    if (this.gamesService.correctFill[0] * this.gamesService.correctFill[1] * this.gamesService.correctFill[2] * this.gamesService.correctFill[3] == 1) {
      //this.storageService.currentName_Date[5] = this.storageService.currentName_Date[5] + 3
      apple = apple + 1
    }
    if (this.gamesService.correctGrid == 1) {
      // this.storageService.currentName_Date[5] = this.storageService.currentName_Date[5] + 3
      apple = apple + 1
    }
    if (this.gamesService.correctChoice == 1) {
      //this.storageService.currentName_Date[5] = this.storageService.currentName_Date[5] + 3
      apple = apple + 1
    }
    if (this.gamesService.correctDraw == 1) {
      //this.storageService.currentName_Date[5] = this.storageService.currentName_Date[5] + 3
      apple = apple + 1
    }
    if (this.apptextService.currentText.game5Q1 != ""  && this.gamesService.correctMCQ[0] * this.gamesService.correctMCQ[1] * this.gamesService.correctMCQ[2] == 1) {
      //normal MCQ page
      apple = apple + 1
    }
    if (this.apptextService.currentText.game5Q1 == ""  && this.gamesService.correctMCQ[0] > 0) {
     //choose your favorite page, all answers acceptable
     apple = apple + 1
    }
    if (this.gamesService.correctMatch == 1) {
      //this.storageService.currentName_Date[5] = this.storageService.currentName_Date[5] + 3
      apple = apple + 1
    }
    if (this.gamesService.correctCode == 1) {
      //this.storageService.currentName_Date[5] = this.storageService.currentName_Date[5] + 3
      apple = apple + 1
    }
    if (apple == 2) {
      this.storageService.currentName_Date[5] = this.storageService.currentName_Date[5] + 1
      //this.presentAlert("用心完成靈修!", "獎勵: 蘋果 1 個")
      this.presentAlert("用心完成靈修！ 獎勵蘋果1個！","<img src='../assets/images/version1/apple5.png'>")
    }
    console.log("storageService.currentName_Data: "+this.storageService.currentName_Date)

    //var s = parseInt(this.storageService.currentId_Date[5])
    //s = s+100; //each done day = 100
    //s = s+20*this.gamesService.correctFill[0]
    //      +20*this.gamesService.correctFill[1]
    //      +20*this.gamesService.correctFill[2]
    //      +60*this.gamesService.correctGrid
    //      +60*this.gamesService.correctDraw
    //console.log(s)
    //this.storageService.currentId_Date[5] = s.toString()

    //update local storage
    console.log("updating local storage: "+this.storageService.currentPages)
    console.log("updating local storage: "+this.storageService.currentName_Date)
    this.storageService.updatePages(this.storageService.currentPages);
    this.storageService.updateItem(this.storageService.currentName_Date);
    this.router.navigate(['/menu']);
  }

  async presentAlert(title: string, content:string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      cssClass: 'applePrompt',
      buttons: ["謝謝"]
    })
    await alert.present()
  }

  clickL() {
    // route to the first game indicated in text.json
    //this.gamesService.routeGame("1")
    this.router.navigate(['/game'+this.fmgameNumber]);
  }

  //clickR() {
    //this.router.navigate(['/menu']);
  //}

}
