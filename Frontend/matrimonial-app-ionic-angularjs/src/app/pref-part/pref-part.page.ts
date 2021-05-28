import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pref-part',
  templateUrl: './pref-part.page.html',
  styleUrls: ['./pref-part.page.scss'],
})
export class PrefPartPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onClick() {
    this.router.navigate(['/user-home'])
  }

}
