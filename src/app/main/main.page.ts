import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Platform } from '@ionic/angular';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  constructor(private router: Router,
    private screenOrientation: ScreenOrientation,
    private platform: Platform,
    public gamesService: GamesService,) { }

  ionViewWillEnter() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

  ngOnInit() {
    // detect device aspect ratio for menu page (landscape mode)
    this.gamesService.ratio = 2
    this.gamesService.ratio = window.screen.height/window.screen.width // use height/width because portrait mode now
    console.log("width: "+window.screen.width)
    console.log("height: "+window.screen.height)
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

}
