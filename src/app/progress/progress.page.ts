import { Component, OnInit } from '@angular/core';
import { ApptextService } from '../apptext.service';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';
import { GamesService } from '../games.service';
import { AlertController } from '@ionic/angular'; 

@Component({
  selector: 'app-progress',
  templateUrl: './progress.page.html',
  styleUrls: ['./progress.page.scss'],
})
export class ProgressPage implements OnInit {

  //index: number = 0; //array index of current day eg. day 1, index=0
  public jsonAll = [];
  public mmData : any; 
  public level : any; //5 levels according to number of fruits bought
  public days : any; //total number of quiet time days

  constructor(public apptextService: ApptextService,
    public storageService: StorageService,
    public gamesService: GamesService,
    private router: Router,
    public alertController: AlertController,) { }

  ngOnInit() {
    //console.log("current volume"+this.storageService.v)
    //console.log("current page: "+this.storageService.currentPages)
    
    console.log(this.mmData)
    console.log(this.storageService.currentName_Date[6])
    this.calcLevel() //calculate level
    
    console.log("level: "+this.level)

    this.apptextService.searchData(1)
    .subscribe(data => {
      this.jsonAll = data;
        if (this.storageService.currentPages[this.storageService.v-1] != 0 || this.storageService.v == 1) {
          this.jsonAll = this.jsonAll.slice(0, this.storageService.currentPages[this.storageService.v-1]); //not the start of a new volume (review current volume)
          console.log("review mode and not zero")
        } else {
          this.jsonAll = this.jsonAll.slice(0, this.storageService.currentPages[this.storageService.v-2]);//start of a new volume (review previous volume)
          console.log("review mode and zero")
        }

        //this.jsonAll = this.jsonAll.slice(0, this.storageService.currentPages[this.storageService.v-1]);
        console.log(this.jsonAll);
      //console.log(this.jsonAll[0].title);
      });
  }

  //calculate level based on number of fruits
  calcLevel() {
    this.days = this.storageService.currentPages[0]+this.storageService.currentPages[1]+this.storageService.currentPages[2]
      +this.storageService.currentPages[3]+this.storageService.currentPages[4]+this.storageService.currentPages[5]
      +this.storageService.currentPages[6]+this.storageService.currentPages[7]+this.storageService.currentPages[8]
      +this.storageService.currentPages[9]+this.storageService.currentPages[10]+this.storageService.currentPages[11]
    var n = this.storageService.currentName_Date[6] //number of apple trees
    if (n > 3) {
      this.level = "靈修勇士"
    } else {
      if (n > 2) {
        this.level = "愛主小門徒"
      } else {
        if (n > 1) {
          this.level = "同行小天使"
        } else {
          if (n > 0) {
            this.level = "成長小信徒"
          } else {
            this.level = "主的小羊"
          }
        }
      }
    }
  }

  getPrize() {
    console.log("getting prize...")
    this.presentConfirm("用 30 個蘋果換取 1 棵蘋果樹?","",30)
    //if (i < 4) 
    //  //console.log("you need 50 diamonds")
    //  this.presentConfirm("用 50 枚寶石換取這個聖靈果子?","",50,i)
    //} else {
    //  if (i < 7) {
    //    //console.log("you need 70 diamonds")
    //    this.presentConfirm("用 70 枚寶石換取這個聖靈果子?","",70,i)
    //  } else {
    //    //console.log("you need 90 diamonds")
    //    this.presentConfirm("用 90 枚寶石換取這個聖靈果子?","",90,i)
    //  }
    //}
  }

  async presentConfirm(title, content, p) {
    let alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('取消 clicked');
          }
        },
        {
          text: '確定',
          handler: () => {
            if (this.storageService.currentName_Date[5] >= p) {
              console.log('確定 clicked');
              console.log("old score: "+this.storageService.currentName_Date)
              this.storageService.currentName_Date[5] = this.storageService.currentName_Date[5] - p
              console.log("new score: "+this.storageService.currentName_Date)
              this.storageService.currentName_Date[6] = this.storageService.currentName_Date[6] + 1
              console.log(this.storageService.currentName_Date[6])
              this.storageService.updateItem(this.storageService.currentName_Date);
              this.calcLevel()
            } else {
              this.presentAlert("你需要 "+p+" 個蘋果才可換取 1 棵蘋果樹呢","加油!")
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async presentAlert(title: string, content:string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ["知道了"]
    })
    await alert.present()
  }

  review() {
      console.log("current volume"+this.storageService.v)
      console.log("current page: "+this.storageService.currentPages)
      console.log("mmData: "+this.mmData)
    
    this.gamesService.reviewMode = this.mmData

      console.log("go to Day "+this.mmData)
    if (this.mmData != null) {
      this.router.navigate(['/title']);
    }
      console.log("do nothing")
      console.log("mmData: "+this.mmData)
    
  }

  clickL() {
    this.router.navigate(['/menu']);
  }

}
