import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.page.html',
  styleUrls: ['./parent.page.scss'],
})
export class ParentPage implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {
  }

  clickL() {
    this.router.navigate(['/menu']);
  }

}
