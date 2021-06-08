import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { OtpComponent } from '../components/otp/otp.component';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private modalController: ModalController, private router: Router) { }
  // exform: FormGroup;
  mobileNumber = '';

  ngOnInit() {

    // this.exform = new FormGroup({
    //   'codeno' : new FormControl(null, Validators.required),
    //   'phoneno' : new FormControl(null, [Validators.required, Validators.maxLength(10)]),
    //   'otp' : new FormControl(null, [Validators.required, Validators.maxLength(6)])
    // });
  }

  login() {
    this.presentModal();

  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: OtpComponent,
      cssClass: 'my-custom-class2',
      componentProps: {
        'path': '/user-home'
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    console.log(data);
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