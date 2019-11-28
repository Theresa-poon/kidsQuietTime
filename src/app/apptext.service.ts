import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IText } from './text';

@Injectable({
  providedIn: 'root'
})
export class ApptextService {

  currentText: any; //the text for the current day 

  private _url: string ="/assets/data/text.json";

  constructor(private http: HttpClient) { }

  // get all the text for all the days
  searchData() {
    return this.http.get<IText[]>(this._url);
  }

}
