import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

import{ HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { MobileAccessibility } from '@ionic-native/mobile-accessibility/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    IonicStorageModule.forRoot(),
    HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    WebView,
    ScreenOrientation,
    MobileAccessibility,
    NativeAudio,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    File
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
