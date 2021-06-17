import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-upload-photos',
  templateUrl: './upload-photos.page.html',
  styleUrls: ['./upload-photos.page.scss'],
})
export class UploadPhotosPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  submit() {
 
    this.router.navigate(['/user-home']);
  }
}
