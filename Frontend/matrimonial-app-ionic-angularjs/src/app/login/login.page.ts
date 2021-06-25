import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { OtpComponent } from '../components/otp/otp.component';
import { ChatService } from '../services/chat.service';
import { PersonalDetails } from '../services/PersonalDetails.service';
import {HttpHeaders} from '@angular/common/http';
import { HttpClient , HttpParams } from "@angular/common/http";

// import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private modalController: ModalController, private router: Router, private chatService: ChatService,
    private service:PersonalDetails,private http:HttpClient) { }
  // exform: FormGroup;
  mobileNumber;
  code;

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
    let phn = this.mobileNumber.internationalNumber.split(' ');
    console.log(phn[0]+phn[1]+phn[2]);
    let phn1=phn[0]+phn[1]+phn[2];
    this.service.loginsendotp(phn1).subscribe((msg)=>{
      console.log(msg);
    this.code=msg['xMagicToken'];

    });
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
    let phn = this.mobileNumber.internationalNumber.split(' ');
    let phoneNumber=phn[0]+phn[1]+phn[2];
    const us={
      otpCode:OtpComponent.otp,

      phoneNumber:phoneNumber
    }
    console.log(us);
    const Httpheaders=new HttpHeaders({
      'Content-Type': 'application/json',
      'x-magic-token':this.code

    });
    this.http.post(`/api/auth/login/otp/verify`,us,{headers:Httpheaders,withCredentials:true},
    ).subscribe((msg)=>{
      console.log(msg);
    });
  }




}
