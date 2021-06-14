import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entry-slides',
  templateUrl: './entry-slides.page.html',
  styleUrls: ['./entry-slides.page.scss'],
})
export class EntrySlidesPage implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };



  move(slides){
    // console.log(slides)
    slides.slideTo(1)
}
move1(slides){
  // console.log(slides)
  slides.slideTo(2)
}


  constructor() { }

  ngOnInit() {
  }

}
