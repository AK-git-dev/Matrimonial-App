import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ed-car',
  templateUrl: './ed-car.page.html',
  styleUrls: ['./ed-car.page.scss'],
})
export class EdCarPage implements OnInit {

  educationArray: object[] = [];

  constructor(private router: Router) { }

  ngOnInit() {

  }

  submit() {
    this.router.navigate(['/pref-part']);
  }

  addEducation() {
    console.log('Add')
    this.educationArray.push({
      'label': 'Other Degree',
      'value': ''
    });
  }

  removeEducation(index) {
    this.educationArray.splice(index, 1);
  }

}
