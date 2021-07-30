/* eslint-disable radix */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { OtpComponent } from '../components/otp/otp.component';
import { ChatService } from '../services/chat.service';
import { PersonalDetails } from '../services/PersonalDetails.service';
import {HttpHeaders} from '@angular/common/http';
import { HttpClient , HttpParams } from "@angular/common/http";
import { AlertController } from '@ionic/angular';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  ConnectyCube = window["ConnectyCube"];
  static userId;
  globalResponse: any;
  isLoggedIn: boolean;

  constructor(private modalController: ModalController, private router: Router, private chatService: ChatService,
    private service: PersonalDetails,private http: HttpClient,private alertController: AlertController) { }
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
    let a = this.mobileNumber.nationalNumber;
    let phoneNo = a.slice(1,a.length).split(' ').join('');

    const searchParams = { email: phoneNo+'@gmail.com' };
    this.ConnectyCube.users
      .get(searchParams)
      .then((result) => {
        LoginPage.userId = result.user.id;
        this.chatService.login({login:result.user.login,password:a.slice(1,a.length)});
        this.chatService.connectToChat({userId:result.user.id,password:a.slice(1,a.length)});
      })
      .catch((error) => {console.log(error);});
    let phn = this.mobileNumber.internationalNumber.split(' ');
    console.log(phn[0]+phn[1]+phn[2]);
    let phn1=phn[0]+phn[1]+phn[2];
    this.service.loginsendotp(phn1).subscribe((msg)=>{
      console.log(msg);
    this.code=msg['xMagicToken'];
    this.globalResponse = msg;

    },
    error => {
      console.log(error.message);
      this.numberErrorMsg();
   },
    () => {
      console.log(this.globalResponse);
      this.presentModal();
    }
    );



  }
// ////////////////////////////////////////////////////////////////////// Error msg
async numberErrorMsg(){
  const alert = await this.alertController.create({
    header: 'Enter Number is not register',
    cssClass: 'my-custom-class',
    message: 'Please register your Number',
    buttons: ['Exit']
  });

  await alert.present();
}

  async presentModal() {
    const modal = await this.modalController.create({
      component: OtpComponent,
      cssClass: 'my-custom-class2',

    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    console.log(data);
    let phn = this.mobileNumber.internationalNumber.split(' ');
    let phoneNumber=phn[0]+phn[1]+phn[2];
    const us={
      otpCode:OtpComponent.otp,
      phoneNumber
    };
    console.log(us);
    const Httpheaders=new HttpHeaders({
      'Content-Type': 'application/json',
      'x-magic-token':this.code

    });
    this.http.post(`/api/auth/login/otp/verify`,us,{headers:Httpheaders,withCredentials:true},
    ).subscribe((msg)=>{
      console.log(msg);
      this.globalResponse = msg;
    },
     error => {
       console.log(error.message);
      this.otpErrorMsg();
    },
     () => {
       console.log(this.globalResponse);
       this.router.navigate(['/user-home']);

       this.isLoggedIn = true;
     }
    );

  }

  // ////////////////////////////////////////////////////////////////////// Error msg
async otpErrorMsg(){
  const alert = await this.alertController.create({
    header: 'Invalid OTP',
    cssClass: 'my-custom-class',
    message: 'Please enter valid OTP',
    buttons: ['Exit']
  });

  await alert.present();
}





}
