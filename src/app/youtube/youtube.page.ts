import { Component, OnInit } from '@angular/core';
import { ApptextService } from '../apptext.service';
import { DomSanitizer} from '@angular/platform-browser';
//import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { NetworkService } from '../network.service';
//import { AlertController } from '@ionic/angular'; 
//import { Router } from '@angular/router';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.page.html',
  styleUrls: ['./youtube.page.scss'],
})
export class YoutubePage implements OnInit {

  public videoAll: any;
  public video : any;
  public videoID : any;
  //public test : any;

  constructor(public apptextService: ApptextService,
    //public alertController: AlertController,
    private sanitizer: DomSanitizer,
    //private youtube: YoutubeVideoPlayer,
    public networkService: NetworkService,
    //private router: Router,
    ) { }

  ionViewWillEnter() {
  //  this.screenOrientation.unlock();

    //if(this.networkService.previousStatus == 1) {
    //  this.presentAlert("你沒有連接網絡啊!","請檢查網絡狀況...")
    //  this.router.navigate(['/main']);
    //}

  }

  ngOnInit() {
    //this.youtube.openVideo('5iMjWVy3d_Q');
    //this.test = ["//www.youtube.com/embed/gYXB3FCcckw", "//www.youtube.com/embed/5iMjWVy3d_Q"]
    this.apptextService.searchYoutube()
    .subscribe(
      
      (data) => {
      this.videoAll = data
      this.video = this.videoAll.items
      console.log(this.video);
      console.log(this.video[0]);
      console.log(this.video[0].id.videoId);
      console.log(this.video[0].snippet.title);
      this.videoID = [];
        for (let i = 0; i < this.video.length; i++) {
          let temp = "//www.youtube.com/embed/"+this.video[i].id.videoId+"?controls=0"
          console.log(temp)
          //let cleanTemp = this.sanitizer.bypassSecurityTrustResourceUrl(temp);
          //console.log(cleanTemp)
          this.videoID.push(temp)
          console.log("this.videoID: "+this.videoID)
        }
      },

      (err) => {console.log("error in getting Youtube channel")}
      
      );
  }

  getSafeUrl(i) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.videoID[i])
  }

  //async presentAlert(title: string, content:string) {
  //  const alert = await this.alertController.create({
  //    header: title,
  //    message: content,
  //    buttons: ["OK"]
  //  })
  //  await alert.present()
  //}

}
