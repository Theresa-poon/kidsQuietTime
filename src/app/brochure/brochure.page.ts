import { Component, OnInit } from '@angular/core';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-brochure',
  templateUrl: './brochure.page.html',
  styleUrls: ['./brochure.page.scss'],
})
export class BrochurePage implements OnInit {

  public pages: any //array of available pages
  public doctorP: any; //array of available pages for doctor brochure (e.g. 1,2,3,4,5,6,...)
  public whyP: any; //array of available pages for why brochure (e.g. 1,2,3,4,5,6,...)
  public oneP: any; //array of available pages for QT1 (e.g. 1,2,3,4,5,6,...)
  public twoP: any; //array of available pages for QT1 (e.g. 1,2,3,4,5,6,...)

  constructor(public gamesService: GamesService,) { }

  ngOnInit() {

    this.doctorP = ['Doctor1','Doctor2','Doctor3','Doctor4','Doctor5','Doctor6'] 
    this.whyP = ['Why1','Why2','Why3','Why4','Why5','Why6','Why7','Why8','Why9','Why10','Why11','Why12','Why13','Why14','Why15','Why16'] 
    this.oneP = ['One1','One2','One3','One4','One5','One6','One7','One8','One9','One10','One11','One12','One13','One14','One15','One16','One17','One18','One19','One20','One21','One22','One23','One24','One25','One26','One27','One28','One29','One30','One31','One32'] 
    this.twoP = ['Two1','Two2','Two3','Two4','Two5','Two6','Two7','Two8','Two9','Two10','Two11','Two12','Two13','Two14','Two15','Two16','Two17','Two18','Two19','Two20','Two21','Two22','Two23','Two24','Two25','Two26','Two27','Two28','Two29','Two30','Two31','Two32']
    console.log("page is = "+this.gamesService.currentCorona)

    switch (this.gamesService.currentCorona) {
      case 'Doctor':
          console.log("Doctor.");
          this.pages = this.doctorP
          console.log(this.pages)
          break;
      case 'Why':
          console.log("Why.");
          this.pages = this.whyP
          console.log(this.pages)
          break;
      case 'One':
          console.log("One.");
          this.pages = this.oneP
          console.log(this.pages)
          break;
      case 'Two':
          console.log("Two.");
          this.pages = this.twoP
          console.log(this.pages)
          break;
    }

  }

}
