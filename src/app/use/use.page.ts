import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-use',
  templateUrl: './use.page.html',
  styleUrls: ['./use.page.scss'],
})
export class UsePage implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {
  }

  clickL() {
    this.router.navigate(['/menu']);
  }

}
