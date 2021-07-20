import { Component, OnInit } from '@angular/core';
import { PersonalDetails } from '../services/PersonalDetails.service';
import { HttpClient , HttpParams } from "@angular/common/http";
import {HttpHeaders} from '@angular/common/http';
import {FormGroup,FormBuilder,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pref-partner',
  templateUrl: './pref-partner.page.html',
  styleUrls: ['./pref-partner.page.scss'],
})
export class PrefPartnerPage implements OnInit {

  globalResponse: any;
  maHeight: any;
  miHeight: any;
  miAge: any;
  maAge: any;
  caste: any;
  language: any;
  salINR: any;
  salUSD: any;
  status: any;
  occupation: any;
  country: any;

  constructor(private service:PersonalDetails,private router: Router) { }

  ngOnInit() {
  }

  onClick(){
    const addData={
      maxHeight: this.maHeight,
	minHeight: this.miHeight,
	minAge: this.miAge,
	maxAge: this.maAge,
	expectedSalaryInINR: this.salINR,
	expectedSalaryInDollar: this.salUSD,

	salaryType: "INR",
  
	caste: this.caste,
	occupation: this.occupation,
	country: this.country,
	martitialStatus: this.status,
	prefferedMotherTounge: this.language
  }

    console.log(addData);
    this.service.addpreference(addData).subscribe((msg)=>{
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
