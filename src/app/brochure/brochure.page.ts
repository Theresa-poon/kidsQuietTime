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

  constructor(public gamesService: GamesService,) { }

  ngOnInit() {

    this.doctorP = ['Doctor1','Doctor2','Doctor3','Doctor4','Doctor5','Doctor6'] 
    this.whyP = ['Why1','Why2','Why3','Why4','Why5','Why6','Why7','Why8','Why9','Why10','Why11','Why12','Why13','Why14','Why15','Why16'] 
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
    }

  }

}
