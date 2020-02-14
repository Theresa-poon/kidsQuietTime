import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MobileAccessibility } from '@ionic-native/mobile-accessibility/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private mobileAccessibility: MobileAccessibility
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
      this.mobileAccessibility.usePreferredTextZoom(false);
      //console.log(this.platform.width())
    });
  }

}
