import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadedDocumentsPageRoutingModule } from './uploaded-documents-routing.module';

import { UploadedDocumentsPage } from './uploaded-documents.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadedDocumentsPageRoutingModule
  ],
  declarations: [UploadedDocumentsPage]
})
export class UploadedDocumentsPageModule {}
