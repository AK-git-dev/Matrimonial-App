import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { OtpComponent } from '../components/otp/otp.component';
import { ChatService } from '../services/chat.service';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private modalController: ModalController, private router: Router, private chatService: ChatService) { }
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
    let user = {
      userId: 1,
      username: 'aashrayjain',
      password: '7389330512',
      phone: '7389330511',
      full_name: 'Aashray Jain'
    }
    this.chatService.signUp(user);
    this.chatService.createUserSession(user);
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

  
 

}