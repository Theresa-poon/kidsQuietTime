import { Component } from '@angular/core';

import { Platform, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MobileAccessibility } from '@ionic-native/mobile-accessibility/ngx';
import { Network } from '@ionic-native/network/ngx';
import { NetworkService } from './network.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    public events: Events,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private mobileAccessibility: MobileAccessibility,
    public network: Network,
    public networkService: NetworkService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      //this.statusBar.styleDefault(); //ionic default
      this.statusBar.hide() //to ensure full screen effect
      this.statusBar.overlaysWebView(true); //to ensure full screen effect
      this.splashScreen.hide();
      console.log("next line is getTextZoom")
      //this.mobileAccessibility.usePreferredTextZoom(false); // version 6

      this.networkService.initializeNetworkEvents();

      console.log("initializing")

      //Offline event
      this.events.subscribe('network:offline', () => {
        //alert('請檢查網絡狀況');  
        console.log("no network");
       });

      if (this.platform.is('tablet')) {
        this.mobileAccessibility.setTextZoom(200);
      } else {
        this.mobileAccessibility.usePreferredTextZoom(false); 
      }

    });
  }

}
