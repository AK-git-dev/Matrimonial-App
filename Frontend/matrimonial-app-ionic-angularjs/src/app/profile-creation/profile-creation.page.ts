import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-creation',
  templateUrl: './profile-creation.page.html',
  styleUrls: ['./profile-creation.page.scss'],
})
export class ProfileCreationPage implements OnInit {
 
  isHidden = false;
 constructor() { }

  ngOnInit() {
  }

 changeStatus()  {
    var status = document.getElementById("mariatlStatus") as HTMLInputElement ;
    if (status.value == "NM") {
       document.getElementById("any").style.visibility="hidden";
      this.isHidden=true;
    }
    else {
       document.getElementById("any").style.visibility="visible";
      this.isHidden=false;
    }

  }

}
