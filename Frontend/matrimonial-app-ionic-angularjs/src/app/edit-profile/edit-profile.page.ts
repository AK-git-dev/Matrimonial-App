import { Component, OnInit } from '@angular/core';
import { PersonalDetails } from "../services/PersonalDetails.service";
import { Post } from "../class/post";
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
   lstcomments: any[];

  constructor( private personalDetails: PersonalDetails  ) { }
  segmentModel = 'about';

  // USer Field
  username: string;
  MotherTongue;
  UserCaste;
  //---- Religion, height & Country not found

  // Critical Details
  dateOfBirth;
  martialStatus;

  // Education & Career
  Educations;
  Occupation;

  // Income not found

  userId: number = 12345;

  ngOnInit() {

    this.personalDetails.userDetail() //.pipe(map(userDetails => userDetails))
     .subscribe
     (
       data =>
       {
        // console.warn(data);
        //  this.lstcomments = data;

        const arrData = [data];
        console.log(arrData);
        //console.log(arrData[0].userDetails.fullname)

        this.username=arrData[0].userDetails.fullname;
        this.UserCaste=arrData[0].userDetails.UserCaste;
        this.MotherTongue=arrData[0].userDetails.MotherTongue.LanguageName;
        
        this.martialStatus=arrData[0].userDetails.martialStatus;
        this.dateOfBirth=arrData[0].userDetails.dateOfBirth;

        this.Educations=arrData[0].userDetails.Educations[0].degree;
        this.Occupation=arrData[0].userDetails.Occupation;
        
       }
     );

    
   
  }

  segmentChanged(event) {
    console.log(event)
  }


  


}
