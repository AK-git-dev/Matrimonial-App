import { Component, OnInit } from '@angular/core';
import { PersonalDetails } from '../services/PersonalDetails.service';
import { HttpClient , HttpParams } from "@angular/common/http";
import {HttpHeaders} from '@angular/common/http';
import {FormGroup,FormBuilder,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-education-career',
  templateUrl: './education-career.page.html',
  styleUrls: ['./education-career.page.scss'],
})
export class EducationCareerPage implements OnInit {
  globalResponse: Object;
  hdegree;
  pgDegree: any;
  ugDegree: any;
  uName: any;
  ugCollege: any;
  schoolName: any;
  employeeIn: any;
  occupation: any;
  org: any;
  abroad: any;

  constructor(private service:PersonalDetails,private router: Router) { }

  ngOnInit() {
  }

  onClick()
  {
    const addHDegree={
      type: "Highest Degree",
      degree: this.hdegree,
      institutionName: "NA",
      specializationIn: "Computer Science and Engineering",
      passoutYear: "2021"

     // schoolName: this.schoolName,
     // abroad: this.abroad,
    }

    const addpgDegree={
      type: "Post Grad Degree",
      degree: this.pgDegree,
     // uName: this.uName,
     institutionName: "NA",
     specializationIn: "Computer Science and Engineering",
     passoutYear: "2021"
    }

    const addUG={
      type: "Under Grad Degree",
      degree: this.ugDegree,
      institutionName: this.ugCollege,
       specializationIn: "Computer Science and Engineering",
      passoutYear: "2021"

    }

    const Occup={
      currentCompanyName: this.org,
      position: this.occupation,
      type: this.employeeIn,
    }
  

    let data=[addHDegree,addpgDegree,addUG];

    console.log(data);
    // Education API's
    // ---------------- Higher Degree
    this.service.addeducation(data).subscribe((msg)=>{
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

  // // ------------------Post grade Degree
  //   this.service.addeducation(addpgDegree).subscribe((msg)=>{
  //     console.log(msg); 
  //       this.globalResponse = msg;
  //   },
  //   error => {
  //    console.log(error.message);
  // },
  //  () => {
  //    console.log(this.globalResponse);
  //    this.router.navigate(['/edit-profile']);
  //  }
  //   )

  //   // --------------- Under Grade Degree
  //   this.service.addeducation(addUG).subscribe((msg)=>{
  //     console.log(msg); 
  //       this.globalResponse = msg;
  //   },
  //   error => {
  //    console.log(error.message);
  // },
  //  () => {
  //    console.log(this.globalResponse);
  //    this.router.navigate(['/edit-profile']);
  //  }
  //   )

// ------------------------------- END

  // Occupation API
   this.service.addoccupation(Occup).subscribe((msg)=>{
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

