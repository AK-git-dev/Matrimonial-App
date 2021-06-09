import { Component, OnInit } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-uploaded-documents',
  templateUrl: './uploaded-documents.page.html',
  styleUrls: ['./uploaded-documents.page.scss'],
})
export class UploadedDocumentsPage implements OnInit {
  imageURI: any;
  imageFileName: any;

  constructor(private transfer: FileTransfer, private file: File, private camera: Camera) { }

  ngOnInit() {
  }

  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = imageData
      console.log(this.imageURI);
    }, err => {
      console.log(err);
    })
  }

  upload() {
    let fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: 'ionicfile',
      fileName: 'ionicfile',
      chunkedMode: false,
      mimeType: "image/jpeg/pdf",
      headers: {}
    }

    fileTransfer.upload(this.imageURI, 'http://localhost:5000/api', options).then((data) => {
      console.log(data + " Uploaded successfully");
    }, err => {
      console.log(err);
    });
  }

}
