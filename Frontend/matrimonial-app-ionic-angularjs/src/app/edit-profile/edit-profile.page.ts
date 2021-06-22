import { Component, OnInit } from '@angular/core';
import { PersonalDetails } from "../services/PersonalDetails.service";
import { Post } from "../class/post";
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  constructor( private personalDetails: PersonalDetails ) { }
  segmentModel = 'about';

  username: string = "Aashray Jain";
  userId: number = 12345;

  lstcomments: Post[];

  ngOnInit() {

    this.personalDetails.getDetails()
    .subscribe
    (
      data =>
      {

        this.lstcomments = data;
      }
    );
  }

  
  

  segmentChanged(event) {
    console.log(event)
  }


  


}
