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

  username: string = "Aashray Jain";
  userId: number = 12345;

  //lstcomments: Post[];
 
  
  ngOnInit() {

    this.personalDetails.userDetails() //.pipe(map(userDetails => userDetails))
     .subscribe
     (
       data =>
       {
         console.warn(data);
         this.lstcomments = data;
       }
     );

    
   
  }

  segmentChanged(event) {
    console.log(event)
  }


  


}
