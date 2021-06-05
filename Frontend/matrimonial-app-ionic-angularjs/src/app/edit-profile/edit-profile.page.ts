import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  constructor() { }
  segmentModel = 'about';

  username: string = "Aashray Jain";
  userId: number = 12345;

  ngOnInit() {
  }

  segmentChanged(event) {
    console.log(event)
  }

}
