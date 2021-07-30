/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { OtpComponent } from '../components/otp/otp.component';
import { ChatService } from '../services/chat.service';
import { PersonalDetails } from '../services/PersonalDetails.service';
import { HttpClient , HttpParams } from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {FormGroup,FormBuilder,FormControl, Validators } from '@angular/forms';
import Cookies from 'js-cookie';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  ngForm: FormGroup;
  username;
  mobileNumber;
  gender = 'male';
  otpCounter;
  flag = false;
  flag2 =false;
  flag3 = false;
  code='';
  checkedvalue=false;
  dob;
  globalResponse: Object;
  isLoggedIn: boolean;




  constructor(private router: Router, private modalController: ModalController, private chatService: ChatService,
    private service: PersonalDetails,private http: HttpClient, private alertController: AlertController , private formBuilder: FormBuilder)
    {

    }

  ngOnInit() {
    this.flag = false;
    this.flag2 = false;
    this.flag3 = false;
  }

  submit() {
    let a: String = this.mobileNumber.nationalNumber;
    let name: String = this.username;
    let user = {
      username: name.toLowerCase().split(' ').join(''),
      password: a.slice(1,a.length),
      email: a.slice(1,a.length).split(' ').join('')+'@gmail.com',
      // eslint-disable-next-line radix
      phone: parseInt(a.slice(1,a.length).split(' ').join('')),
      full_name: this.username
    };
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
    this.http.post(`/api/auth/signup/account/verify/otp`,us,{headers:Httpheaders,withCredentials:true},
    ).subscribe((msg)=>{
      console.log(msg);
      this.globalResponse = msg;
    },
    error => {
      console.log(error.message);
      this.presentModal();
     this.otpErrorMsg();
     this.flag2 = true;
     this.flag3 = false;
   },
    () => {
      console.log(this.globalResponse);
      this.flag2 = false;
      this.flag3 = true;
      this.isLoggedIn = true;
    });
  }
    // ////////////////////////////////////////////////////////////////////// Error msg
async otpErrorMsg(){
  const alert = await this.alertController.create({
    header: 'Invalid OTP',
    cssClass: 'my-custom-class',
    message: 'Please enter valid OTP',
    // buttons: ['Exit']
  });

  await alert.present();
}

  counter() {
    let phn = this.mobileNumber.internationalNumber.split(' ');
    console.log(phn[0]+phn[1]+phn[2]);
    let phn1=phn[0]+phn[1]+phn[2];
    this.service.sendotp(phn1).subscribe((msg)=>{
      console.log(msg);
    // eslint-disable-next-line @typescript-eslint/dot-notation
    this.code=msg['xMagicToken'];
    this.globalResponse = msg;
    },
    error => {
      console.log(error.message);

     this.numberError();

   },
    () => {
      console.log(this.globalResponse);
      this.otpCounter = 60;
      this.flag = true;
      this.stop();
      this.flag2 = false;
      this.flag3 = false;
    } );

  }
  async numberError(){
    const alert = await this.alertController.create({
      header: 'Number already exists',
      cssClass: 'my-custom-class',
      message: 'Number already register',
      // buttons: ['Exit']
    });

    await alert.present();
  }

  stop() {
    setTimeout(() => {
      this.otpCounter--;
      //console.log(this.otpCounter);
      if (this.otpCounter > 1) {
        this.stop();
      }
      if (this.otpCounter === 55) {
        this.presentModal();
        this.flag = false;
      }
    }, 1000);

  }
  getvalue()
  {
    this.checkedvalue=!this.checkedvalue;
    console.log(this.checkedvalue);
  }


  submitreg()
  {

    const userdet={
    fullname: this.username,
	  dateOfBirth: "1998-01-01",
	gender: this.gender,
	email: "",
	// martialStatus:"Single",
	motherTongue: "Hindi",
	isCasteBarrier: this.checkedvalue,
	fathersName: "",
	mothersName: ""
    };
    console.log(userdet);

    // Cookies.get('isLogedIn')
   this.service.basicdetails(userdet).subscribe((msg)=>{
     console.log(msg);
     this.globalResponse = msg;
   },
   error => {
    console.log(error.message);
 },
  () => {
    console.log(this.globalResponse);
    this.router.navigate(['/ed-car']);
  }

   );
  }


}
