import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { OtpComponent } from '../components/otp/otp.component';
import { ChatService } from '../services/chat.service';
import { PersonalDetails } from '../services/PersonalDetails.service';
import { HttpClient , HttpParams } from "@angular/common/http";
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
  ngForm : FormGroup;
  username;
  mobileNumber;
  gender = 'male'
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
    private service:PersonalDetails,private http: HttpClient, private alertController: AlertController , private formBuilder : FormBuilder) 
    {
      this.ngForm = this.formBuilder.group(
      {
        username : new FormControl('',Validators.compose([Validators.required])),
        mobileNumber : new FormControl('',Validators.compose([Validators.required])),
        gender : new FormControl('',Validators.compose([Validators.required])),
      });
    }

  ngOnInit() {
    this.flag = false;
    this.flag2 = false;
    this.flag3 = false;
  }

  submit() {
    let me = this;
    if (me.ngForm.valid) {
      alert('form is valid');
      this.router.navigate(['/ed-car']);
    }
    else {
      alert('empty fields');
    }
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

      phoneNumber:phoneNumber
    }
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
    this.code=msg['xMagicToken'];

    });

    this.otpCounter = 60;
    this.flag = true;
    this.stop();
    this.flag2 = false;
    this.flag3 = false;

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
	  dateOfBirth:"1998-01-01",
	gender: this.gender,
	email: "",
	martialStatus:"",
	motherTongue: "Hindi",
	isCasteBarrier: this.checkedvalue,
	fathersName: "",
	mothersName: ""
    }
    console.log(userdet);

    // Cookies.get('isLogedIn')
   this.service.basicdetails(userdet).subscribe((msg)=>{
     console.log(msg);
   })
  }


}
