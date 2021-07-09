import { Component, OnInit } from '@angular/core';
import { PersonalDetails } from '../services/PersonalDetails.service';
import { HttpClient , HttpParams } from "@angular/common/http";
import {HttpHeaders} from '@angular/common/http';
import {FormGroup,FormBuilder,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-lifestyle',
  templateUrl: './lifestyle.page.html',
  styleUrls: ['./lifestyle.page.scss'],
})
export class LifestylePage implements OnInit {

  isHidden = true;
  globalResponse: Object;
  height: any;
  weight: any;
  body: any;
  comp: any;
  disability: any;
  discDisability: any;
  smoking: any;
  drinking: any;
  diet: any;
  hobbies: any;
  SnF: any;
  constructor(private service:PersonalDetails,private router: Router) { }

  ngOnInit() {
  }

  onClick1(){
    this.isHidden = true;
  }
  onClick(){
    this.isHidden = false;
  }

  onClick3(){

    const addData={
      height: this.height,
      weight: this.weight,

     // bloodGroup: "O+",
     // dressStyle: "Traditional",

      bodyShape: this.body,
      skinComplextion: this.comp,
      diet: this.diet,
      drinkingHabits: this.drinking,
      smokingHabits: this.smoking,
      sportsFitness: this.SnF,
      haveAnyDisability: this.disability,
      descriptionOfDisability: this.discDisability,

      // hobbies:this.hobbies,
    }

    console.log(addData);
    this.service.addLifestyle(addData).subscribe((msg)=>{
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

