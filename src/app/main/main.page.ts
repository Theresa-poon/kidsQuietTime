import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Platform } from '@ionic/angular';
import { GamesService } from '../games.service';
import { NetworkService } from '../network.service';
import { AlertController } from '@ionic/angular'; 

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  constructor(private router: Router,
    private screenOrientation: ScreenOrientation,
    private platform: Platform,
    public gamesService: GamesService,
    public networkService: NetworkService,
    public alertController: AlertController,) { }

  ionViewWillEnter() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
        //detect device aspect ratio for menu page (landscape mode)
    this.gamesService.ratio = 2
    if(window.screen.height > window.screen.width) {
      this.gamesService.ratio = window.screen.height/window.screen.width // use height/width because portrait mode now
      this.gamesService.pageHeight = window.screen.width*910/641
    } else {
      this.gamesService.ratio = window.screen.width/window.screen.height // if landscape mode
      this.gamesService.pageHeight = window.screen.height*910/641
    }
    console.log("width: "+window.screen.width)
    console.log("height: "+window.screen.height)
    console.log("gospel page height = "+this.gamesService.pageHeight)
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
      this.platform.backButton.subscribe(()=>{
          navigator['app'].exitApp();
  });
}

  //Information() {
    //console.log("go to information")
    //this.router.navigate(['/information']);
  //}

  gospel() {
    console.log("go to gospel")
    this.router.navigate(['/gospel']);
  }

  quiettime() {
    console.log("go to menu")
    this.router.navigate(['/menu']);
  }

  youtube() {
    console.log("go to youtube")
    if(this.networkService.previousStatus == 1) {
      this.presentAlert("你沒有連接網絡啊!","請檢查網絡狀況...")
    } else {
      //this.router.navigate(['/youtube']);
      window.open('https://www.youtube.com/channel/UCnQM2z0xgU4zeQIXxFoXE8Q', '_blank');
    }
  }

  async presentAlert(title: string, content:string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ["OK"]
    })
    await alert.present()
  }

}
