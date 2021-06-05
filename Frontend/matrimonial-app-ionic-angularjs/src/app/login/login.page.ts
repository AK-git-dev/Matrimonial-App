import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private alertController: AlertController, private router: Router) { }
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
    this.presentAlert();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Enter 6 digit OTP',
      cssClass: 'my-custom-class',
      inputs: [{
        name: 'otp',
        type: 'number',
        placeholder: 'Enter 6 digit OTP',
        id: 'otp',
        attributes: {
          maxLength: 6,
          minLength: 6
        }
      }],
      buttons: [{
        text: 'Resend',
        handler: () => {
          console.log('resend');
        }
      },
      {
        text: 'Login',
        handler: () => {
          console.log('Login');
          this.router.navigate(['/user-home']);
        }
      }]
    });
    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
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