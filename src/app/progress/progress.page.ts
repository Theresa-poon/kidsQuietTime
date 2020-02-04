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

    this.apptextService.searchData()
    .subscribe(data => {
      this.jsonAll = data;
      //this.jsonAll = this.jsonAll.slice(0, this.storageService.currentId_Date[0]);

        this.jsonAll = this.jsonAll.slice(0, this.storageService.currentPages[this.storageService.v-1]);

        console.log(this.jsonAll);
      //console.log(this.jsonAll[0].title);
      });
  }

  //calculate level based on number of fruits
  calcLevel() {
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
