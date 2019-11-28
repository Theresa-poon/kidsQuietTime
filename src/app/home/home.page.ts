import { Component } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { StorageService } from '../storage.service';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //items: Item[] = [];

  constructor(private screenOrientation: ScreenOrientation,
    private storage: Storage,
    private storageService: StorageService,
    public gamesService: GamesService,
    private router: Router) {}

  ionViewWillEnter() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    this.loadItems();
  }

  // READ
  loadItems() {
    this.storageService.getItems().then(items => {
      console.log(items)
      console.log(items == null)
      if (items == null) {
        items = [0, 0, 0, 0, 0, 0];
        console.log(items[0]) // last read page
        console.log(items[1]) // date of completion of last read page
        console.log(items[2]) // month of completion of last read page
        console.log(items[3]) // year of completion of last read page
        console.log(items[4]) // number of consecutive reading days 
        console.log(items[5]) // score
      }
      this.storageService.currentId_Date = items;
      console.log(this.storageService.currentId_Date);
      console.log(this.storageService.currentId_Date[1]);
      console.log(this.storageService.currentId_Date[2]);
      console.log(this.storageService.currentId_Date[3]);
    });
    this.gamesService.reviewMode = 0
  }

  lesson() {
    if(this.storageService.currentId_Date[0] == 3) {
        console.log("你已經完成所有靈修材料啦!")
    } else {
        this.router.navigate(['/lesson-one']);
    }
  }

  progress() {
    this.router.navigate(['/progress']);
  }

  tips() {
    this.router.navigate(['/tips']);
  }
  
}
  
