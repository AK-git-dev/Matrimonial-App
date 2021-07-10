import { Component, OnInit } from '@angular/core';
import { PersonalDetails } from '../services/PersonalDetails.service';
import { HttpClient , HttpParams } from "@angular/common/http";
import {HttpHeaders} from '@angular/common/http';
import {FormGroup,FormBuilder,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  isDown: boolean = true;
  isDown1: boolean = true;

  globalResponse: any;
  personOne: any;
  mobileNumber: any;
  personTwo: any;
  mobileNumber2: any;
  mobileNumber3: any;
  mobileNumber5: any;
  personThree: any;
  constructor(private service:PersonalDetails,private router: Router) { }

  ngOnInit() {
  }

  onClick(){

// ----------------- Persone 1
    console.warn(this.mobileNumber)
    //let a = this.mobileNumber.nationalNumber.split(' ');
   let a = this.mobileNumber.internationalNumber.split(' '); 
    
   const addPhone={
      relationship: this.personOne,
      fullname: "",
      phoneNumber: a[0]+a[1]+a[2]
     }

// ------------------- Persone 2
     console.warn(this.mobileNumber3);
     
     //let b = this.mobileNumber2.nationalNumber.split(' ');
     let b = this.mobileNumber3.internationalNumber.split(' '); 
   
     const adddPhoneT={
    relationship: this.personTwo,
    fullname: "",
    phoneNumber: b[0]+b[1]+b[2]
    }

// -------------------- Persone 3
    console.warn(this.mobileNumber5);
     
    //let c = this.mobileNumber2.nationalNumber.split(' ');
    let c = this.mobileNumber5.internationalNumber.split(' '); 
  
    const adddPhoneTh={
   relationship: this.personThree,
   fullname: "",
   phoneNumber: c[0]+b[1]+b[2]
   }


  let Phone=[addPhone,adddPhoneT,adddPhoneTh];

    console.log(Phone);
    this.service.addFamilyDetails(Phone).subscribe((msg)=>{
      console.log(msg); 
        this.globalResponse = msg;
    },
    error => {
     console.log(error.message);
    },
   () => {
     console.log(this.globalResponse);
     this.router.navigate(['/edit-profile']);
    }
    )
  
  }
}
