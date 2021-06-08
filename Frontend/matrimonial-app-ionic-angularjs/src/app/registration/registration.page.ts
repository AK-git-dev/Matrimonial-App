import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { OtpComponent } from '../components/otp/otp.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  mobileNumber = '';
  gender = 'male'
  otpCounter;
  flag = false

  constructor(private router: Router, private modalController: ModalController) { }

  ngOnInit() {
    this.flag = false;
  }

  submit() {
    console.log('Submit');
    this.router.navigate(['/ed-car']);
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: OtpComponent,
      cssClass: 'my-custom-class2',
      componentProps: {
        'path': 'none'
      }
      
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    console.log(data);
  }

  counter() {
    this.otpCounter = 60;
    this.flag = true;
    this.stop();
  }

  stop() {
    setTimeout(() => {    
      this.otpCounter--;  
      console.log(this.otpCounter);
      if (this.otpCounter > 1) {
        this.stop();
      } 
      if (this.otpCounter === 55) {
        this.presentModal();
      }
    }, 1000);
    
  }

}
