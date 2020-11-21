import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-knowgod',
  templateUrl: './knowgod.page.html',
  styleUrls: ['./knowgod.page.scss'],
})
export class KnowgodPage implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {
  }

  clickL() {
    this.router.navigate(['/menu']);
  }

}
