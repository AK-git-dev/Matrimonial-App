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
  motherTongue;
  UserCaste;
  Country;
  Height;

  // Critical Details
  dateOfBirth;
  martialStatus;

  // Education & Career
  Education;
  Occupation;
  Income;
  // Income not found

  // LifeStyle
  Diet;
  Smoke;
  Drink;

  //Family
  familyStatus;
  fatherOccupation;
  motherOccupation;
  noOfBrothers;
  noOfSisters;
  familyValues;

  //Contact
  phoneNumber;
  email;
  personOnePhoneNumber;
  personOneRelationship;
  personTwoPhoneNumber;
  personTwoRelationship;

  // Prefer Partner Basic Details
  minHeight;
  maxHeight;
  minAge;
  maxAge;
  country;
  martitialStatus;

  //Education and Occupation
  partnerOccupation;
  partnerExpectedSalaryInDollar;
  partnerExpectedSalaryInINR;

  //Religion
  partnerCast;
  partnerLanguage;

  userId: number = 12345;

  ngOnInit() {

    this.personalDetails.userDetail() 
     .subscribe
     (
       data =>
       {
        // console.warn(data);
        //  this.lstcomments = data;

        const arrData = [data];
        console.log(arrData);
        //console.log(arrData[0].userDetails.fullname)

        this.username=arrData[0].userDetails?.fullname;
        this.UserCaste=arrData[0].userDetails?.UserCaste;
        this.motherTongue=arrData[0].userDetails.MotherTongue?.LanguageName;
        this.Height=arrData[0].userDetails.LifeStyle?.height;
        this.Country=arrData[0].userDetails.Address?.country;

        this.martialStatus=arrData[0].userDetails?.martialStatus;
        this.dateOfBirth=arrData[0].userDetails?.dateOfBirth;

        this.Education=arrData[0].userDetails.Educations[0]?.degree;
        this.Occupation=arrData[0].userDetails.Occupation?.position;
        this.Income=arrData[0].userDetails.Occupation?.salary;


        this.Diet=arrData[0].userDetails.LifeStyle?.diet;
        this.Smoke=arrData[0].userDetails.LifeStyle?.smokingHabits;
        this.Drink=arrData[0].userDetails.LifeStyle?.drinkingHabits;

        this.familyStatus=arrData[0].userDetails.FamilyDetail?.familyStatus;
        this.fatherOccupation=arrData[0].userDetails.FamilyDetail?.fatherOccupation;
        this.motherOccupation=arrData[0].userDetails.FamilyDetail?.motherOccupation;
        this.noOfBrothers=arrData[0].userDetails.FamilyDetail?.noOfBrothers;
        this.noOfSisters=arrData[0].userDetails.FamilyDetail?.noOfSisters;
        this.familyValues=arrData[0].userDetails.FamilyDetail?.familyValues;


        this.phoneNumber=arrData[0].userDetails?.phoneNumber;
        this.email=arrData[0].userDetails?.email;
        this.personOnePhoneNumber=arrData[0].userDetails.RelativeContacts[0]?.phoneNumber;
        this.personOneRelationship=arrData[0].userDetails.RelativeContacts[0]?.relationship;
        this.personTwoPhoneNumber=arrData[0].userDetails.RelativeContacts[1]?.phoneNumber;
        this.personTwoRelationship=arrData[0].userDetails.RelativeContacts[1]?.relationship;
    
        // Prefer Partner Details
        this.minHeight=arrData[0].userDetails.PrefferedPartnerChoice?.minHeight;
        this.maxHeight=arrData[0].userDetails.PrefferedPartnerChoice?.maxHeight;
        this.minAge=arrData[0].userDetails.PrefferedPartnerChoice?.minAge;
        this.maxAge=arrData[0].userDetails.PrefferedPartnerChoice?.maxAge;
        this.country=arrData[0].userDetails.PrefferedPartnerChoice?.country;
        this.martitialStatus=arrData[0].userDetails.PrefferedPartnerChoice?.martitialStatus;
        
        this.partnerOccupation=arrData[0].userDetails.PrefferedPartnerChoice?.occupation;
        this.partnerExpectedSalaryInDollar=arrData[0].userDetails.PrefferedPartnerChoice?.expectedSalaryInDollar;
        this.partnerExpectedSalaryInINR=arrData[0].userDetails.PrefferedPartnerChoice?.expectedSalaryInINR;

        this.partnerCast=arrData[0].userDetails.PrefferedPartnerChoice?.caste;
	      this.partnerLanguage=arrData[0].userDetails.PrefferedPartnerChoice.PrefferedPartnerLanguage?.LanguageName;


      }
     );

    
   
  }

  segmentChanged(event) {
    console.log(event)
  }


  


}
