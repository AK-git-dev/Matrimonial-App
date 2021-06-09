import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UploadedDocumentsPage } from './uploaded-documents.page';

describe('UploadedDocumentsPage', () => {
  let component: UploadedDocumentsPage;
  let fixture: ComponentFixture<UploadedDocumentsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadedDocumentsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UploadedDocumentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
