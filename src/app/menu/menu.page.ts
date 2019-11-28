import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  @ViewChild('slides', {static: true}) slides: IonSlides;
  //@ViewChild('slides') slides: IonSlides;

  sliderConfig = {
    initialSlide: 0,
    speed: 400,
    //slidesPerView: 1.6,
    //spaceBetween: 10,
    slidesPerView: 2,
    spaceBetween: 5,
    centeredSlides: true
  };

  constructor(private router: Router) { }

  ngOnInit() {
  }

  gotoLesson(i) {
    console.log("go to lesson "+i)
    //this.router.navigate(['/details']);
  }

}
