import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PickerController } from '@ionic/angular';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-pref-part',
  templateUrl: './pref-part.page.html',
  styleUrls: ['./pref-part.page.scss'],
})
export class PrefPartPage implements OnInit {

  constructor(private router: Router, private pickerController: PickerController, private chatService: ChatService) { }

  // multiColumnOptions = [
  //   [
  //     "4'8", "4'9", "5'0", "5'1", "5'2", "5'3", "5'4", "5'5", "5'6", "5'7", "5'8", "5'9", "6'0", 
  //     "6'1", "6'2", "6'3", "6'4", "6'5", "6'6", "6'7"
  //   ], 
  //   [
  //     "4'8", "4'9", "5'0", "5'1", "5'2", "5'3", "5'4", "5'5", "5'6", "5'7", "5'8", "5'9", "6'0", 
  //     "6'1", "6'2", "6'3", "6'4", "6'5", "6'6", "6'7"
  //   ]
  // ]
  

  ngOnInit() {
  }

  // onClick() {
  //   this.router.navigate(['/user-home'])
  // }

  submit() {
    // let user = {
    //   userId: 1,
    //   username: 'aashrayjain',
    //   password: '7389330512',
    //   phone: '7389330511',
    //   full_name: 'Aashray Jain'
    // }
    // this.chatService.signUp(user);
    // this.chatService.createUserSession(user);
    this.router.navigate(['/user-home']);
  }

  // async openPicker(numColums, numOptions, columnOptions) {
  //   const picker = await this.pickerController.create({
  //     columns: this.getColumns(numColums, numOptions, columnOptions),
  //     buttons: [
  //       {
  //         text: 'Cancel', 
  //         role: 'cancel'
  //       }, 
  //       {
  //         text: 'Confirm', 
  //         handler: (value) => {
  //           console.log(value);
  //         }
  //       }
  //     ]
  //   });

  //   await picker.present();
  // }

  // getColumns(numColums, numOptions, columnOptions) {
  //   let columns = []
  //   for (let i = 0; i < numColums; ++i) {
  //     columns.push({
  //       name: `col-${i}`,
  //       options: this.getColumnOptions(i, numOptions, columnOptions)
  //     });
  //   }
  //   return columns;
  // }

  // getColumnOptions(columnIndex, numOptions, columnOptions) {
  //   let options = [];
  //   for (let i = 0; i < numOptions; ++i) {
  //     options.push({
  //       text: columnOptions[columnIndex][i % numOptions],
  //       value: i
  //     });
  //   }
  //   return options;
  // }

}
