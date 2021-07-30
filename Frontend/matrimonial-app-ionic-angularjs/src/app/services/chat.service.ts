/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})

export class ChatService {

  ConnectyCube = window["ConnectyCube"];

  user: User;

  constructor() {

  }


  //called in app component
  initialize() {
    console.log(this.ConnectyCube);
    const CREDENTIALS = {
      appId: 4974,
      authKey: "4uK2wqdYd9nKunx",
      authSecret: "Xu5K23tUUH3pdNu"
    };
    const CONFIG = {
      debug: { mode: 1 }, // enable DEBUG mode (mode 0 is logs off, mode 1 -> console.log())
      chat: {
        streamManagement: {
          enable: true
        }
      }
    };


    this.ConnectyCube.init(CREDENTIALS,CONFIG);
  }

  //called in app.component
  createSessionApplication() {
    this.ConnectyCube.createSession()
      .then((session) => {
        console.log('Application session created');
        console.log(session);
        sessionStorage.setItem('application_session', session);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  createUserSession(user) {
    const userCredentials = { login: user.username, password: user.password };

    this.ConnectyCube.createSession(userCredentials)
      .then((session) => {
        // console.log('User session ceated');
        console.log('session',session);
        sessionStorage.setItem('user_session', session);
      })
      .catch((error) => {
        console.log(error);
      });
  }


  signUp(user) {
    const userProfile = {
      login: user.username,
      password: user.password,
      full_name: user.full_name,
      email: user.email,
      phone: user.phone
    };

    this.ConnectyCube.users
      .signup(userProfile)
      .then((user) => {
        console.log('User signed in');
        console.log(user.id);
        // this.user = new User();
        // this.user.setUser(user);
        // console.log(this.user.getUser());
      })
      .catch((error) => {
        console.log(error);
      });
  }

  login(userCredentials ){
    this.ConnectyCube.login(userCredentials )
    .then((user) => {
    })
    .catch((error) =>{
      console.log(error);
    });
  }

  logout() {
    this.ConnectyCube.destroySession(() => {
      console.log('User session over');
      sessionStorage.removeItem('user_session');
    }).catch((error) => { });

  }

  getUserByLogin(username, callback) {
    const searchParams = { full_name: username };

    this.ConnectyCube.users
      .get(searchParams)
      .then((result) => {
        console.log(result);
        callback(result);
      })
      .catch((error) => {
        console.log(error);
        callback(error);
      });
  }

  connectToChat(userCredentials) {
    this.ConnectyCube.chat.connect(userCredentials)
    .then(() => {
      console.log('Connected to chat');
    }).catch((error) => {
      console.log(error);
    });
  }

  // isConnected() {
  //   const isConnected = this.ConnectyCube.chat.isConnected;
  //   return isConnected;
  // }

  disconnect() {
    this.ConnectyCube.chat.disconnect();

  }

  createDialog(occupantId) {
    const params = {
      type: 3,
      occupants_ids: [occupantId],
    };

    this.ConnectyCube.chat.dialog
      .create(params)
      .then((dialog) => {
        sessionStorage.setItem('dialog._id', dialog._id);
        //console.log(sessionStorage.getItem(dialog._id));
        //console.log('dialog',dialog);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // getAllDialog() {
  //   const params = {
  //     chat_dialog_id: sessionStorage.getItem('dialog._id'),
  //     sort_desc: "date_sent[lt]",
  //     limit: 1000,
  //     skip: 0,
  //   };

  //   this.ConnectyCube.chat.message
  //     .list(params)
  //     .then((messages) => {
  //       console.log('list',messages)
  //       return messages;
  //     })
  //     .catch((error) => {});
  // }

  async sendReceiveChat(occupantId,msg){
    const opponentId = occupantId;
    const message = {
      type: 'chat',
      body: msg,
      extension: {
        save_to_history: 1,
        dialog_id: sessionStorage.getItem('dialog._id'),
        date_sent: Math.floor(Date.now() / 1000)
      },
      markable: 1
    };
    message['id'] = this.ConnectyCube.chat.send(opponentId, message);
    return message['id'];
  }

}
