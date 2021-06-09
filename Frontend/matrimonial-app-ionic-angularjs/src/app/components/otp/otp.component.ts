import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { NgxOtpInputConfig } from 'ngx-otp-input';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {


  // Data passed in by componentProps
  @Input()
  path: string;

  otpInputConfig: NgxOtpInputConfig = {
    otpLength: 4,
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
    if (this.path !== 'none') {
      this.router.navigate([this.path]);
    } 
  }


  handeOtpChange(value: string[]): void {
    console.log(value);
  }

  handleFillEvent(value: string): void {
    console.log(value);
  }

}
