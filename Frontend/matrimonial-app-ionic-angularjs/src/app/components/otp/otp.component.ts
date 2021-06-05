import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { NgxOtpInputConfig } from 'ngx-otp-input';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {

  otpInputConfig: NgxOtpInputConfig = {
    otpLength: 6,
    autofocus: true,
    classList: {
      inputBox: "my-super-box-class",
      input: "my-super-class",
      inputFilled: "my-super-filled-class",
      inputDisabled: "my-super-disable-class",
      inputSuccess: "my-super-success-class",
      inputError: "my-super-error-class"
    }
  };

  constructor(private modalController: ModalController, private router: Router) {
    
  }

  ngOnInit() { }


  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  login() {
    this.dismiss();
    this.router.navigate(['/user-home']);
  }


  handeOtpChange(value: string[]): void {
    console.log(value);
  }

  handleFillEvent(value: string): void {
    console.log(value);
  }

}
