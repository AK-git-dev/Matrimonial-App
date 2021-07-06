import { Component, OnInit } from '@angular/core';
import { PersonalDetails } from '../services/PersonalDetails.service';
import { HttpClient , HttpParams } from "@angular/common/http";
import {HttpHeaders} from '@angular/common/http';
import {FormGroup,FormBuilder,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-creation',
  templateUrl: './profile-creation.page.html',
  styleUrls: ['./profile-creation.page.scss'],
})
export class ProfileCreationPage implements OnInit {

  isHidden = true;
name;
  globalResponse: Object;
  constructor(private service:PersonalDetails,private router: Router) { }

  ngOnInit() {
  }

 changeStatus(event){
    if (event.target.value == "NM") {
      this.isHidden=true;
    }
    else {
      this.isHidden=false;
    }
  }

  
  
  onClick()
  {
    const userdet={

      fullname: this.name,
    }
    console.log(userdet);
    this.service.basicdetails(userdet).subscribe((msg)=>{
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