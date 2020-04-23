import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verse',
  templateUrl: './verse.page.html',
  styleUrls: ['./verse.page.scss'],
})
export class VersePage implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {
  }

  clickL() {
    this.router.navigate(['/menu']);
  }

}
