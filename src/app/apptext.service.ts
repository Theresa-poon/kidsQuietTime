import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IText } from './text';
import { IGospel} from './gospel';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApptextService {

  currentText: any; //the text for the current day 

  private _url: string ="/assets/data/text1.json"; //for testing book 1
  //private _url: string ="/assets/data/text2.json"; //for testing book 2

  constructor(private http: HttpClient, 
    public storageService: StorageService) { }

  // get all the text for all the days
  searchData(review) {
    console.log(review)
    console.log(this.storageService.v-1)
    console.log(this.storageService.currentPages[this.storageService.v-1])
    if (review != 0) {
      if (this.storageService.currentPages[this.storageService.v-1] != 0 || this.storageService.v == 1) {
        this._url="/assets/data/text"+this.storageService.v+".json"  //not the start of a new volume (review current volume)
        console.log("review mode and not zero")
      } else {
        let volume = this.storageService.v - 1
        this._url="/assets/data/text"+volume+".json" //start of a new volume (review previous volume)
        console.log("review mode and zero")
      }
    } else {
      this._url="/assets/data/text"+this.storageService.v+".json" //not review mode (start current volume lesson)
      console.log("not review mode")
    }
    //this._url="/assets/data/text"+this.storageService.v+".json" // no need
    return this.http.get<IText[]>(this._url); // original
  }

  searchGospel() {
    return this.http.get<IGospel[]>("/assets/data/gospel.json"); 
  }

}
