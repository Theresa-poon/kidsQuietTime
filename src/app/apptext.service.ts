import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IText } from './text';
import { StorageService } from './storage.service';


@Injectable({
  providedIn: 'root'
})
export class ApptextService {

  currentText: any; //the text for the current day 

  private _url: string ="/assets/data/text1.json"; //for testing book 1
  //private _url: string ="/assets/data/text2.json"; //for testing book 2

  constructor(private http: HttpClient, public storageService: StorageService) { }

  // get all the text for all the days
  searchData() {
    if (this.storageService.currentPages[this.storageService.v-1] != 0 || this.storageService.v == 1) {
      this._url="/assets/data/text"+this.storageService.v+".json"  //not the start of a new volume
    } else {
      let volume = this.storageService.v - 1
      this._url="/assets/data/text"+volume+".json" //start of a new volume (allow review of previous volume)
    }
    //this._url="/assets/data/text"+this.storageService.v+".json"
    return this.http.get<IText[]>(this._url);
  }

}
