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
  public lessonAll = []; // array containing lessons of user selected volume for review
  public volumeAll : any; //array containing previous and current volumes
  public mmData : any;
  public mmData1 : any; // user selection of lesson to review
  public level : any; //5 levels according to number of fruits bought
  public days : any; //total number of quiet time days
  public z : any;

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

    //find all volumes to be displayed in review pull-down menu
      this.volumeAll = []
      console.log("this.storageService.v: "+this.storageService.v)
      //if(this.storageService.currentPages[this.storageService.v-1] != 0) {
      //  this.z = this.storageService.v + 1
      //} else {
      //  this.z = this.storageService.v
      //}
      console.log("length: "+this.z)
      for (let i = 1; i < 13; i++) {
        if (this.storageService.currentPages[i-1] != 0 && this.storageService.currentPages[i-1] != 99) {
          this.volumeAll.push(i)
          console.log("this.volumeAll: "+this.volumeAll)
        }
      }

  }

  //calculate level based on number of fruits
  calcLevel() {
    this.days = 0
    //this.days = this.storageService.currentPages[0]+this.storageService.currentPages[1]+this.storageService.currentPages[2]
    //  +this.storageService.currentPages[3]+this.storageService.currentPages[4]+this.storageService.currentPages[5]
    //  +this.storageService.currentPages[6]+this.storageService.currentPages[7]+this.storageService.currentPages[8]
    //  +this.storageService.currentPages[9]+this.storageService.currentPages[10]+this.storageService.currentPages[11]
    for (let j = 1; j < 13; j++) {
      if (this.storageService.currentPages[j-1] != 99) {
        this.days = this.days + this.storageService.currentPages[j-1]
        console.log("this.days "+this.days)
      }
    }
    
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

async showRadio() {
  let radio_options = [];
  console.log("how many lessons to show: "+this.storageService.currentPages[this.storageService.vReview-1])
  for(let i=0;i<this.storageService.currentPages[this.storageService.vReview-1];++i){
     let j = i+1
     radio_options.push({
      type: 'radio',
      label : '第'+j+'課： '+this.lessonAll[i].title,
      value : j,
      //checked : i === 0
    });
  }

  const alert = await this.alertController.create({
      header : '選擇課堂',
      inputs : radio_options ,
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('取消 clicked');
            this.mmData1 = 99
            console.log("mmData1: "+this.mmData)
          }
        },
        {
          text: '確定',
          handler: data => {
            console.log('確定 clicked');
            console.log("user selected book:"+this.storageService.currentPages[this.storageService.vReview-1])
            console.log("user selected lesson: "+data)
            this.gamesService.reviewMode = data
            this.mmData1 = 99
            if(data != null) {
              this.router.navigate(['/title']);
            }
          }
        },
      ]
  });
  
  await alert.present();
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

  review1() { // display available lessons after user selection of book volume for review
    console.log("in review 1 ...")
    console.log("mmData1:"+this.mmData1)
    this.storageService.vReview = this.mmData1
    this.apptextService.searchData(1)
      .subscribe(data => {
      this.lessonAll = data;
      console.log("first data: "+this.lessonAll[0].title)
      this.showRadio()
    })
  }

  clickL() {
    this.router.navigate(['/menu']);
  }

}
