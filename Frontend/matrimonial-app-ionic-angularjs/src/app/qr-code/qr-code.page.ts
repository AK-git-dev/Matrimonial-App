import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import jsQR from "jsqr";
import { PersonalDetails } from "../services/PersonalDetails.service";

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.page.html',
  styleUrls: ['./qr-code.page.scss'],
})
export class QrCodePage implements OnInit {

  username;
// //////////////////////////////////////////////// QR Input value
 value;

// ////////////////////////////////////////////// end
  scanActive = false;
  scanResult = null;

 
@ViewChild('video', {static: false}) video: ElementRef;
@ViewChild('canvas', {static: false}) canvas: ElementRef;
@ViewChild('fileinput', {static: false}) fileinput: ElementRef;

videoElement: any;
canvasElement: any;
canvasContext: any;

loading: HTMLIonLoadingElement;

  constructor(private activatedRoute: ActivatedRoute, private tostCtrl: ToastController, 
     private loadingController: LoadingController,private plt: Platform, private personalDetails: PersonalDetails 
     ) {

       const isInStanaloneMode = () =>
       'standalone' in window.navigator && window.navigator['standalone'];
       
       if(this.plt.is('ios') && isInStanaloneMode()) {
        //  console.log('I am a an iOS PWA!');
       }
      }

  ngOnInit() {

    this.personalDetails.userDetail().subscribe(
      data => {
        const arrData = [data];

        this.username=arrData[0].userDetails?.fullname;

      this.value = this.username;
      }
    );

    
  }

ngAfterViewInit(){
  this.videoElement = this.video.nativeElement;
  this.canvasElement = this.canvas.nativeElement;
  this.canvasContext = this.canvasElement.getContext('2d');
}
captureImage() {
  this. fileinput.nativeElement.click();
}

handleFile( files: FileList ) {
  const file = files.item(0);
  var img = new Image();
  img.onload = () => {
    this.canvasContext.drawImage(img, 0, 0, this.canvasElement.width, this.canvasElement.height);
    const imageData = this.canvasContext.getImageData(
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: 'dontInvert'
    });
    if (code) {
      this.scanResult = code.data;
      this.showQrTost();
    }
  };
  img.src = URL.createObjectURL(file);

}



  async startScan() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'enviroment'}
    });
    this.videoElement.srcObject = stream;
    this.videoElement.setAttribute('playsinline', true);
    this.videoElement.play();


    this.loading = await this.loadingController.create({});
    await this.loading.present();
    requestAnimationFrame(this.scan.bind(this));
  }


async scan(){
  console.log('SCAN');

  if(this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA) {

    if (this.loading) {
     await this.loading.dismiss();
      this.loading =null;
      this.scanActive = true;
    }
    this.canvasElement.height = this.videoElement.videoHeight;
    this.canvasElement.width = this.videoElement.videoWidth;

    this.canvasContext.drawImage(
      this.videoElement,
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );

    const imageData = this.canvasContext.getImageData(
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );

    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: 'dontInvert'
    });
    console.log('code', code)

    if (code) {
      this.scanActive=false;
      this.scanResult = code.data;
      this.showQrTost();

    } else {
      if (this.scanActive) {
        requestAnimationFrame(this.scan.bind(this));
      }
    }

  } else {
    requestAnimationFrame(this.scan.bind(this));
  }
}
  stopScan() {
      this.scanActive = false;
  }

  reset() {
    this.scanResult = null;
  }

  async showQrTost(){
    const toast = await this.tostCtrl.create({
      message: 'Open ${this.scanResult}?',
      position:'top',
      buttons: [
        {
          text: 'Open',
        handler: () => {
          window.open(this.scanResult,'_system', 'location=yes');
        }
        }
      ]
    });
    toast.prepend();
  }
}
