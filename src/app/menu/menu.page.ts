import { Component, OnInit, ViewChild } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Router } from '@angular/router';
//import { IonSlides } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { StorageService } from '../storage.service';
import { GamesService } from '../games.service';
import { AlertController } from '@ionic/angular'; 
import { Platform } from '@ionic/angular';
// import { StatusBar } from '@ionic-native/status-bar/ngx'; //for full screen effect

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  public item: any; //array of available book volumes (e.g. 1,2,3,4,5,6,...)
  UserName: string; //user name input
  v: any; //current book volume
  newBk: any; // value = 0 or 1 (indicates start new book or not)
  container: any; // css class of top bar (larger lower margin for devices with smaller height to width ratio)
  bookcover: any; // css class of main content (larger width percentage for devices with smaller height to width ratio)
  welcome: any; //css class of welcome wording (increase height for tablets)
  input: any; //css class of input box (increase height for tablets)
  buttonTop1: any; //css class of top button1 (increase height for tablets)
  buttonTop2: any; //css class of top button2 (increase height for tablets)

  //@ViewChild('slides', {static: true}) slides: IonSlides;

 // sliderConfig = {
  //  initialSlide: 0,
  //  speed: 400,
  //  slidesPerView: 4,
  //  spaceBetween: 5,
  //  centeredSlides: false
  //};

  constructor(private screenOrientation: ScreenOrientation,
    private router: Router,
    private storage: Storage,
    public storageService: StorageService,
    public gamesService: GamesService,
    public alertController: AlertController,
    private platform: Platform,) { }

  ionViewWillEnter() {
    this.newBk = 0
    this.container = 'container1'
    this.bookcover = 'bookCover1'
    this.welcome = 'welcome2'
    this.input = 'input2'
    this.buttonTop1 = 'buttonTop1b'
    this.buttonTop2 = 'buttonTop2b'
    //this.statusBar.hide(); //to enable full screen mode
    //this.statusBar.overlaysWebView(true); //to enable full screen mode
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    if (this.platform.is('tablet')) { //set css class for tablet or phone
      this.welcome = 'welcome1'
      this.input = 'input1'
      this.buttonTop1 = 'buttonTop1a'
      this.buttonTop2 = 'buttonTop2a'
    } else {
      this.welcome = 'welcome2'
      this.input = 'input2'
      this.buttonTop1 = 'buttonTop1b'
      this.buttonTop2 = 'buttonTop2b'
    }
    this.loadItems()
    this.loadPages()
  }

  ngOnInit() {
    this.item = [1,2,3,4] // for 2020, only books 1-4
  }

// READ
loadItems() {
  this.storageService.getItems().then(items => {
    console.log(items)
    console.log(items == null)
    if (items == null) {
     // items = [0, 0, 0, 0, 0, 0, 0]; //production
      items = [0, 0, 0, 0, 0, 0, 0]; //for testing only
      console.log(items[0]) // last read page (to be deleted) / username
      console.log(items[1]) // date of completion of last read page
      console.log(items[2]) // month of completion of last read page
      console.log(items[3]) // year of completion of last read page
      console.log(items[4]) // number of consecutive reading days 
      console.log(items[5]) // score (=number of apples in version 3)
      console.log(items[6]) // number of apple trees
    }
    this.storageService.currentName_Date = items;
    console.log(this.storageService.currentName_Date);
    console.log(this.storageService.currentName_Date[1]);
    console.log(this.storageService.currentName_Date[2]);
    console.log(this.storageService.currentName_Date[3]);
  });
  this.gamesService.reviewMode = 0
  //detect device aspect ratio // (calculation now in main.page)
    //this.gamesService.ratio = 2
    //this.gamesService.ratio = window.screen.width/window.screen.height
  console.log("width: "+window.screen.width)
  console.log("height: "+window.screen.height)
  console.log("screen width/height: "+this.gamesService.ratio)

    if(this.gamesService.ratio > 1.8) {
      this.container = 'container1'  //devices with height to width ratio > 1.8
      this.bookcover = 'bookCover1'
      console.log(this.bookcover)
    } else {
      if(this.platform.is('tablet')) {
        this.container = 'container3'  
        this.bookcover = 'bookCover3'
        console.log(this.bookcover)
      } else {
        this.container = 'container2'  
        this.bookcover = 'bookCover2'
      }
    }

}

// READ
loadPages() {
  this.storageService.getPages().then(pages => {
    console.log(pages)
    console.log(pages == null)
    if (pages == null) {
      //pages = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //for production
      pages = [0, 0, 0, 0, 99, 99, 99, 99, 99, 99, 99, 99]; //for testing only
      // console.log(pages[0]) // last read page of book volume 1, 99 = volume not available
      // console.log(pages[1]) // last read page of book volume 2
    } else {
      //pages[3] = 99
      pages[4] = 99
      pages[5] = 99
      pages[6] = 99
      pages[7] = 99
      pages[8] = 99
      pages[9] = 99
      pages[10] = 99
      pages[11] = 99
    }
    this.storageService.currentPages = pages;
    console.log(this.storageService.currentPages);
    console.log(this.storageService.currentPages[1]);
    console.log(this.storageService.currentPages[2]);
    console.log(this.storageService.currentPages[3]);
    console.log("this.storageService.v= "+this.storageService.v)
    // version 5: this.v = 1+Math.floor((pages[0]+pages[1]+pages[2]+pages[3]+pages[4]+pages[5]+pages[6]+pages[7]+pages[8]+pages[9]+pages[10]+pages[11])/30)
    
    if (this.storageService.v == null) { // fresh entry to app
      var i;
      for (i = 0; i < pages.length; i++) {
        this.v = i + 1
        if (pages[i] < 30) {  // volume not yet completed, show as current volume
          break;
        }
        if (pages[i] == 99) { // volume not yet available, show previous volume
          this.v = this.v - 1
          break;
        }
      }
      this.storageService.v = this.v
    } else {
      this.v = this.storageService.v
    }
    
    console.log("current volume = "+this.storageService.v)
  });
  //this.gamesService.reviewMode = 0
}

  InputName() {
    console.log("name: "+this.UserName)
    if(this.UserName != null) {
      this.presentConfirm('設定您的名字為:', this.UserName)
    } else {
      this.presentAlert('請輸入您的名字!', '')
    }
  }

  Information() {
    console.log("going to information page...")
    this.router.navigate(['/information']);
  }

  parents() {
    console.log("going to information-parents page...")
    this.router.navigate(['/parent']);
  }

  how() {
    console.log("going to information-how page...")
    this.router.navigate(['/use']);
  }

  warnName() {
    this.presentAlert('請輸入您的名字!', '')
  }

  gotoBook(i) {
    console.log("go to book "+i)
    this.router.navigate(['/title']);
  }

  // show book cover of next volume when user clicks on "開始下一册" button
  changeBk() {
    this.newBk = 1 
    console.log("newBk: "+this.newBk)
  }

  CheckScore() {
    this.router.navigate(['/progress']);
  }

  next() {
    console.log("going to next page...")
    if (this.v != 12 && this.storageService.currentPages[this.v] != 99) {
      this.v = this.v + 1
    } else {
      this.v = 1
    }
    this.storageService.v = this.v
  }

  clickL() {
    this.router.navigate(['/main']);
  }

  async presentConfirm(title, content) {
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
            console.log('確定 clicked');
            this.storageService.currentName_Date[0] = this.UserName;
            console.log(this.storageService.currentName_Date)
            this.storageService.updateItem(this.storageService.currentName_Date);
            this.presentAlert('您好，此靈修系列將使用全屏模式，如出現屏幕右方被導航欄遮擋，可更改手機之隱藏導航欄設定。', '')
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

}
