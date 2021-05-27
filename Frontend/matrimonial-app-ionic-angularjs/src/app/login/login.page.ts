import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor() { }
  // exform: FormGroup;

  ngOnInit() {

  // this.exform = new FormGroup({
  //   'codeno' : new FormControl(null, Validators.required),
  //   'phoneno' : new FormControl(null, [Validators.required, Validators.maxLength(10)]),
  //   'otp' : new FormControl(null, [Validators.required, Validators.maxLength(6)])
  // });
   }

  // clicksub() {
  //   console.log(this.exform.value);
  //   this.exform.reset();
  // }
  // get code() {
  //   return this.exform.get('codeno');
  // }
  // get phoneno() {
  //   return this.exform.get('phoneno');
  // }
  // get otp() {
  //   return this.exform.get('otp');
  // }
  
}