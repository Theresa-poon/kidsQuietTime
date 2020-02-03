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
  container: any; // css class of top bar (larger lower margin for small devices)

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
    //this.statusBar.hide(); //to enable full screen mode
    //this.statusBar.overlaysWebView(true); //to enable full screen mode
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
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
      items = [0, 0, 0, 0, 0, 120, 0]; //for testing only
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
  // detect device aspect ratio
  this.gamesService.ratio = window.screen.width/window.screen.height
  console.log("width: "+window.screen.width)
  console.log("height: "+window.screen.height)
  console.log("screen width/height: "+this.gamesService.ratio)
  if(this.gamesService.ratio > 1.8) {
    this.container = 'container1'
  } else {
    this.container = 'container2'
  }
}

// READ
loadPages() {
  this.storageService.getPages().then(pages => {
    console.log(pages)
    console.log(pages == null)
    if (pages == null) {
      //pages = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //for production
      pages = [16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //for testing only
      console.log(pages[0]) // last read page of book volume 1
      console.log(pages[1]) // last read page of book volume 2
      console.log(pages[2]) // last read page of book volume 3
      console.log(pages[3]) // last read page of book volume 4
      console.log(pages[4]) // last read page of book volume 5 
      console.log(pages[5]) // last read page of book volume 6
    }
    this.storageService.currentPages = pages;
    console.log(this.storageService.currentPages);
    console.log(this.storageService.currentPages[1]);
    console.log(this.storageService.currentPages[2]);
    console.log(this.storageService.currentPages[3]);
    this.v = 1+Math.floor((pages[0]+pages[1]+pages[2]+pages[3]+pages[4]+pages[5]+pages[6]+pages[7]+pages[8]+pages[9]+pages[10]+pages[11])/30)
    this.storageService.v = this.v
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
  }

  parents() {
    console.log("going to information-parents page...")
  }

  how() {
    console.log("going to information-how page...")
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
