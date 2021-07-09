import { Component, OnInit } from '@angular/core';
import { PersonalDetails } from '../services/PersonalDetails.service';
import { HttpClient , HttpParams } from "@angular/common/http";
import {HttpHeaders} from '@angular/common/http';
import {FormGroup,FormBuilder,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-family-details',
  templateUrl: './family-details.page.html',
  styleUrls: ['./family-details.page.scss'],
})
export class FamilyDetailsPage implements OnInit {
  globalResponse: Object;
  fName: any;
  fOccup: any;
  mName: any;
  mOccup: any;
  noBrother: any;
  noSisters: any;
  fStatus: any;
  fValue: any;
  aOrigin: any;
  marriedBro: any;
  marriedSis: any;

  constructor(private service:PersonalDetails,private router: Router) { }

  ngOnInit() {
  }

  onClick(){

    const addData={
      fatherName: this.fName,
	fatherOccupation: this.fOccup,
	motherName: this.mName,
	motherOccupation: this.mOccup ,
	noOfBrothers: this.noBrother ,
	noOfSisters: this.noSisters ,
	familyValues: this.fValue,
	familyStatus: this.fStatus,
	ancestralOrigin: this.aOrigin,

  noOfMarriedBro: this.marriedBro,
  noOfMarriedSis: this.marriedSis
    
  }

    console.log(addData);
    this.service.addFamilyDetails(addData).subscribe((msg)=>{
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
