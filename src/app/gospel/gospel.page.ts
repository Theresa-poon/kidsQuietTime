import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import {IonContent} from '@ionic/angular';
import { GamesService } from '../games.service';
import { Platform, AlertController } from '@ionic/angular'; 
import { ApptextService } from '../apptext.service';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

@Component({
  selector: 'app-gospel',
  templateUrl: './gospel.page.html',
  styleUrls: ['./gospel.page.scss'],
})
export class GospelPage implements OnInit {

  public pages: any; //array of available pages (e.g. 1,2,3,4,5,6,...)
  PageNum: any; //user input of page number to go to
  PageCur: any; //current page in view
  public textGospel = [];
  answer: any; //user input of answer to alert box
  audioUrl: any; //audio file to load

  @ViewChild(IonContent, { read: IonContent, static: true }) content: IonContent;

  constructor(private router: Router,
    public gamesService: GamesService,
    public alertController: AlertController,
    public apptextService: ApptextService,
    private nativeAudio: NativeAudio,
    private platform: Platform,) {
        //console.log("before preload audio...")
        //this.nativeAudio.preloadSimple('uniqueId1', 'assets/images/Gospel/page3.mp3').then(
        //  ()=>{console.log("Playing...")},
        //  ()=>{console.log("Fail to load...")}
        //  );
    }

  ngOnInit() {
    this.pages = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32] 
    this.PageNum = 1
    this.PageCur = 1
    console.log(this.PageCur != 1)
    this.answer = ""
    this.audioUrl = ""
    //document.getElementById("test").onscroll = function() {
    //  var scroll = this.scrollTop;
    //  console.log("scrollY is="+scroll)
    //}
    this.apptextService.searchGospel()
    .subscribe(data => {
      this.textGospel = data;
      console.log(this.textGospel);
      console.log(this.textGospel[1])
      });

}
  
  onScroll(event) {
    if(this.audioUrl != "") {
      console.log("stopping audio...")
      this.nativeAudio.stop('uniqueId1');
      this.nativeAudio.unload('uniqueId1');
    }
    //var scroll = document.getElementById("test").scrollTop;
    var scroll = event.detail.scrollTop
    console.log("scrollY is="+scroll)
    var page = scroll / this.gamesService.pageHeight
    //var page1 = Math.round(page)+1
    this.PageCur = Math.round(page)+1
    console.log("current page = "+page)
    //console.log(page1)
    console.log("this.pageCur = "+this.PageCur)
  }

  clickL() {
    this.router.navigate(['/main']);
  }

  ScrollTo() {
    let x = this.PageNum - 1
    let y = "Id"+x
    console.log("scrolling to: "+ x)
    //let yOffset = document.getElementById(element).offsetTop;
    let yOffset = document.getElementById(y).offsetTop;
    console.log("yOffset is: "+yOffset)
    this.content.scrollToPoint(0, yOffset, 3000)
  }

  audioPlay() {
    this.audioUrl = "assets/images/Gospel/page"+this.PageCur+".mp3"
    console.log("audio url: "+this.audioUrl)
    //this.nativeAudio.preloadSimple('uniqueId1', 'assets/images/Gospel/page3.mp3')
    this.nativeAudio.preloadSimple('uniqueId1', this.audioUrl)
    console.log("before play audio")
    this.nativeAudio.play('uniqueId1');
  }

  exercise() {
  //this.platform.ready().then(() => {
    //console.log("before play audio")
    //this.nativeAudio.play('uniqueId1');
  //}) 
    console.log("show exercise");
    console.log(this.textGospel[this.PageCur-1])
    if(this.textGospel[this.PageCur-1].games == "1") {
      this.presentPrompt1();
    } else {
      this.presentPrompt2();
    }
  }

async presentPrompt1() {
  let alert = await this.alertController.create({
    header: this.textGospel[this.PageCur-1].title,
    message: this.textGospel[this.PageCur-1].game1Q,
    cssClass: 'gospelPrompt',
    inputs: [
      {
        name: 'answer',
        placeholder: '輸入你的答案'
      },
      //{
      //  name: 'password',
      //  placeholder: 'Password',
      //  type: 'password'
      //}
    ],
    buttons: [
      {
        text: '取消',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: '輸入',
        handler: data => {
          this.answer = data.answer
          console.log(this.answer)
          this.presentAlert(this.textGospel[this.PageCur-1].game1A+this.answer,this.textGospel[this.PageCur-1].game1R)
        }
      }
    ]
  });
  await alert.present();
}

async presentPrompt2() {
  let alert = await this.alertController.create({
    header: this.textGospel[this.PageCur-1].title,
    message: this.textGospel[this.PageCur-1].game1Q,
    cssClass: 'gospelPrompt',
    inputs: [
      {
        name: 'choice1',
        type: 'radio',
        label: this.textGospel[this.PageCur-1].game1Q1,
        value: '1'
      },
      {
        name: 'choice2',
        type: 'radio',
        label: this.textGospel[this.PageCur-1].game1Q2,
        value: '2'
      },
      {
        name: 'choice3',
        type: 'radio',
        label: this.textGospel[this.PageCur-1].game1Q3,
        value: '3'
      },
      {
        name: 'choice4',
        type: 'radio',
        label: this.textGospel[this.PageCur-1].game1Q4,
        value: '4'
      }
    ],
    buttons: [
      {
        text: '取消',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: '確定',
        handler: data => {
          console.log(data)
          console.log((data == "1"))
          if(data == "1") {
            this.answer = this.textGospel[this.PageCur-1].game1Q1
          } else {
            if(data == "2") {
              this.answer = this.textGospel[this.PageCur-1].game1Q2
            } else {
              if(data == "3") {
                this.answer = this.textGospel[this.PageCur-1].game1Q3
              } else {
                this.answer = this.textGospel[this.PageCur-1].game1Q4
              }
            }
          }
          console.log(this.answer)
          this.presentAlert(this.textGospel[this.PageCur-1].game1A+this.answer,this.textGospel[this.PageCur-1].game1R)
        }
      }
    ]
  });
  await alert.present();
}

async presentAlert(title,content) {
  let alert = await this.alertController.create({
    header: title,
    message: content,
    cssClass: 'gospelAlert',
    buttons: ['OK']
  });
  await alert.present();
}



}
