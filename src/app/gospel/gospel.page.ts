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
  public textGospel = []; //text of interative quizzes on all pages (gospel.json)
  answer: any; //user input of answer to alert box
  audioUrl: any; //audio file to load
  myInputs: any; //game 5 inputs array
  alertCSS: any; //CSS prompt name for phone = p, tablet = t
  alertCSS1: any; //CSS alert name for phone = p, tablet = t

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
    if (this.platform.is('tablet')) {
      this.alertCSS = "gospelPrompt1";
      this.alertCSS1 = "gospelAlert1";
    } else {
      this.alertCSS = "gospelPrompt"; 
      this.alertCSS1 = "gospelAlert";
    }
    this.apptextService.searchGospel()
    .subscribe(data => { //get data for all quizzes from gospel.json
      this.textGospel = data;
      console.log(this.textGospel);
      console.log(this.textGospel[1])
      });

}
  
  //keeps track of current page number (this.PageCur) while user is scrolling
  onScroll(event) {
    this.audioStop()
    //var scroll = document.getElementById("test").scrollTop;
    var scroll = event.detail.scrollTop
    console.log("scrollY is="+scroll)
    var page = scroll / this.gamesService.pageHeight
    this.PageCur = Math.round(page)+1
    console.log("current page = "+page)
    console.log("this.pageCur = "+this.PageCur)
  }

  clickL() {
    this.audioStop()
    this.router.navigate(['/main']);
  }

  //scrolls to page according to user input (this.PageNum)
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
    //this.audioUrl = "assets/images/Gospel/page"+this.PageCur+".mp3"
    this.audioUrl = "assets/audios/P"+this.PageCur+".mp3"
    console.log("audio url: "+this.audioUrl)
    //this.nativeAudio.preloadSimple('uniqueId1', 'assets/images/Gospel/page3.mp3')
      //this.nativeAudio.preloadSimple('uniqueId1', this.audioUrl)
      //console.log("before play audio")
      //this.nativeAudio.play('uniqueId1');
      this.nativeAudio.preloadSimple('uniqueId1', this.audioUrl).then(
        ()=>{console.log("load audio successful: "+this.audioUrl);
            this.nativeAudio.play('uniqueId1')},
        ()=>{console.log("Fail to load..."+this.audioUrl)}
        );
  }

  audioStop() {
    if(this.audioUrl != "") {
      console.log("stopping audio...")
      this.nativeAudio.stop('uniqueId1');
      this.nativeAudio.unload('uniqueId1').then(
        ()=>{console.log("unloaded audio : "+this.audioUrl);
            this.audioUrl = ""},
        ()=>{console.log("Fail to unload..."+this.audioUrl);
            this.audioUrl = ""}
        );
    }
  }

  exercise() {
  //this.platform.ready().then(() => {
    //console.log("before play audio")
    //this.nativeAudio.play('uniqueId1');
  //}) 
    console.log("show exercise");
    console.log(this.textGospel[this.PageCur-1])
    if(this.textGospel[this.PageCur-1].games == "1") {
      //this.presentPrompt1(); //type 1 exercise: user input
      this.presentPrompt1(this.alertCSS); //type 1 exercise: user input
    } else {
        if(this.textGospel[this.PageCur-1].games == "2") {
          this.presentPrompt2(this.alertCSS); //type 2 exercise: MCQ (unique choice)
        } else {
          if(this.textGospel[this.PageCur-1].games == "3") {
            this.presentPrompt3(this.alertCSS); //type 3 exercise: MCQ (multiple choices allowed, all same response)
          } else {
            if(this.textGospel[this.PageCur-1].games == "4") {
              if(this.textGospel[this.PageCur-1].id == 13 && this.alertCSS == 'gospelPrompt1') {
                this.presentPrompt4("gospelPrompt2"); //type 4 exercise: MCQ (multiple choices allowed, each different response)
              } else {
                this.presentPrompt4(this.alertCSS); //type 4 exercise: MCQ (multiple choices allowed, each different response)
              }
            } else {
              this.myInputs = this.createInputs();
              //this.presentPrompt5(this.alertCSS); //type 5 exercise: MCQ
              if(this.textGospel[this.PageCur-1].id == 17 && this.alertCSS == 'gospelPrompt1') {
                this.presentPrompt5("gospelPrompt2"); //type 5 exercise: MCQ 
              } else {
                this.presentPrompt5(this.alertCSS); //type 5 exercise: MCQ 
              }
            }  
        }
        }
    }
  }

  createInputs() {
    const theNewInputs = [];
    for (let i = 0; i < this.textGospel[this.PageCur-1].game1C.length; i++) {
      theNewInputs.push(
        {
          type: 'checkbox',
          label: this.textGospel[this.PageCur-1].game1C[i].label,
          value: this.textGospel[this.PageCur-1].game1C[i].value,
          name: 'choice'
        }
      );
    }
    console.log("theNewInputs: "+theNewInputs)
    return theNewInputs;
  }

//type 1 exercise: accept user input and show response in presentAlert()
async presentPrompt1(cssprompt) {
  let alert = await this.alertController.create({
    header: this.textGospel[this.PageCur-1].title,
    message: this.textGospel[this.PageCur-1].game1Q,
    cssClass: cssprompt,
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
          console.log("user input is: "+data.answer)
          if(data.answer != "") {
            if(this.textGospel[this.PageCur-1].game1A_show == "0") {
              this.answer = ""  // not to show user input as part of response
            } else {
              this.answer = data.answer // to show user input as part of response
            }
            console.log("non-zero input is: "+this.answer)
            this.presentAlert(this.textGospel[this.PageCur-1].game1A+this.answer,this.textGospel[this.PageCur-1].game1R, this.alertCSS1)
          }
        }
      }
    ]
  });
  await alert.present();
}

//type 2 exercise: MCQ for single choices and show response in presentAlert()
async presentPrompt2(cssprompt) {
  let alert = await this.alertController.create({
    header: this.textGospel[this.PageCur-1].title,
    message: this.textGospel[this.PageCur-1].game1Q,
    //message: '<img src="../assets/images/Gospel/gospel1.png">',
    cssClass: cssprompt,
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
        //label: '<img src="../assets/images/Gospel/gospel1.png">',
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
          console.log("user input = "+data)

          if(data != null) {
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
            if(this.textGospel[this.PageCur-1].game1A_show == "0") {
              this.presentAlert(this.textGospel[this.PageCur-1].game1A,this.textGospel[this.PageCur-1].game1R, this.alertCSS1)
            } else {
              this.presentAlert(this.textGospel[this.PageCur-1].game1A+this.answer,this.textGospel[this.PageCur-1].game1R, this.alertCSS1)
            }
          }

        }
      }
    ]
  });
  await alert.present();
}

//type 3 exercise: MCQ for  4 multiple choices and show response in presentAlert()
async presentPrompt3(cssprompt) {
  let alert = await this.alertController.create({
    header: this.textGospel[this.PageCur-1].title,
    message: this.textGospel[this.PageCur-1].game1Q,
    cssClass: cssprompt,
    inputs: [
      {
        name: 'choice1',
        type: 'checkbox',
        label: this.textGospel[this.PageCur-1].game1Q1,
        value: '1'
      },
      {
        name: 'choice2',
        type: 'checkbox',
        label: this.textGospel[this.PageCur-1].game1Q2,
        value: '2'
      },
      {
        name: 'choice3',
        type: 'checkbox',
        label: this.textGospel[this.PageCur-1].game1Q3,
        value: '3'
      },
      {
        name: 'choice4',
        type: 'checkbox',
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
          console.log("user input = "+data)

          if(data != "") {
            console.log((data == ""))
            this.answer = ""
            console.log(this.answer)
            console.log(data[0])
            console.log(data[1])
            this.presentAlert(this.textGospel[this.PageCur-1].game1A+this.answer,this.textGospel[this.PageCur-1].game1R, this.alertCSS1)
          }

        }
      }
    ]
  });
  await alert.present();
}

//type 5 exercise: MCQ for > 4 multiple choices and show response in presentAlert()
async presentPrompt5(cssprompt) {
  //testV1:any = [{label:'test', value:0, name:'test'},{label:'test1', value:1, name:'test1'},{label:'test2', value:2, name:'test2'}]
  let alert = await this.alertController.create({
    header: this.textGospel[this.PageCur-1].title,
    message: this.textGospel[this.PageCur-1].game1Q,
    cssClass: cssprompt,
    inputs: this.myInputs,
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
          console.log("user input = "+data)

          if(data != "") {
            console.log((data == ""))
            this.answer = ""
            console.log(this.answer)
            console.log(data[0])
            //console.log(data[1])
            console.log("selected answer position: "+data[0])
            console.log("correct answer position: "+this.textGospel[this.PageCur-1].game1M)
            if(data[0] == this.textGospel[this.PageCur-1].game1M) {
              this.presentAlert(this.textGospel[this.PageCur-1].game1A+this.answer,this.textGospel[this.PageCur-1].game1R, this.alertCSS1)
            } else {
               this.presentAlert(this.textGospel[this.PageCur-1].game1W+this.answer,this.textGospel[this.PageCur-1].game1R, this.alertCSS1)
            }
          }

        }
      }
    ]
  });
  await alert.present();
}


//type 4 exercise: MCQ for single choice and show different response for each answer in presentAlert()
async presentPrompt4(cssprompt) {
  let alert = await this.alertController.create({
    header: this.textGospel[this.PageCur-1].title,
    message: this.textGospel[this.PageCur-1].game1Q,
    cssClass: cssprompt,
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
          console.log("user input = "+data)

          if(data != "") {
            console.log((data == ""))
            if(data == "1") {
              this.answer = this.textGospel[this.PageCur-1].game1A1
            } else {
              if(data == "2") {
                this.answer = this.textGospel[this.PageCur-1].game1A2
              } else {
                if(data == "3") {
                  this.answer = this.textGospel[this.PageCur-1].game1A3
                } else {
                  this.answer = this.textGospel[this.PageCur-1].game1A4
                }
              }
            }
            //this.answer = ""
            console.log(this.answer)
            console.log(data[0])
            console.log(data[1])
            console.log("id: "+this.textGospel[this.PageCur-1].id)
            console.log("alertCSS1: "+this.alertCSS1)
            //console.log(this.textGospel[this.PageCur-1].id == 13)
            //if(this.textGospel[this.PageCur-1].id == 13 && this.alertCSS1 == 'gospelAlert1') {
            //  this.presentAlert(this.answer,this.textGospel[this.PageCur-1].game1R, "gospelAlert2")
            //} else {
              this.presentAlert(this.answer,this.textGospel[this.PageCur-1].game1R, this.alertCSS1)
            //}
          }

        }
      }
    ]
  });
  await alert.present();
}

async presentAlert(title,content, cssprompt) {
  let alert = await this.alertController.create({
    header: title,
    message: content,
    cssClass: cssprompt,
    //buttons: ['OK'],
    buttons: [
      {
        text: 'OK',
        handler: data => {
          console.log('Cancel clicked');
          this.answer = ""
        }
      }
    ],
  });
  await alert.present();
}



}
