import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup,FormBuilder,FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-ed-car',
  templateUrl: './ed-car.page.html',
  styleUrls: ['./ed-car.page.scss'],
})
export class EdCarPage implements OnInit {

  educationArray: object[] = [];
  ngForm : FormGroup;
  constructor(private router: Router, private formBuilder : FormBuilder) {
      this.ngForm = this.formBuilder.group(
      {
        Degree : new FormControl('',Validators.compose([Validators.required])),
        educationArray : new FormControl('',Validators.compose([Validators.required])),
        employedIn : new FormControl('',Validators.compose([Validators.required])),
        employedIn1 : new FormControl('',Validators.compose([Validators.required])),
        employedIn2 : new FormControl('',Validators.compose([Validators.required])),

      });
   }

  ngOnInit() {

  }

  submit() {
    let me = this;
    if (me.ngForm.valid){
      alert('form is valid');
      this.router.navigate(['/pref-part']);
    }
    else {
      alert('empty fields');
    }
    
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
