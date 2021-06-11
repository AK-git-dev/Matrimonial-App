import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { OtpComponent } from '../components/otp/otp.component';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  username;
  mobileNumber;
  gender = 'male'
  otpCounter;
  flag = false


  constructor(private router: Router, private modalController: ModalController, private chatService: ChatService) { }

  ngOnInit() {
    this.flag = false;
  }

  submit() {
    console.log('Submit');
    console.log(this.mobileNumber)
    let a = this.mobileNumber.nationalNumber.split(' ');
    console.log(a);
    let user = {
      username: this.username,
      password: '7389330512',
      phone: a[0] + a[1],
      full_name: 'Aashray Jain'
    }
    this.chatService.signUp(user);
    this.chatService.createUserSession(user);
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
