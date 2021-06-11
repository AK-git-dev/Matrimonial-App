import { Injectable } from '@angular/core';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})

export class ChatService {

  ConnectyCube = window["ConnectyCube"];

  user: User;

  constructor() { }

  initialize() {
    console.log(this.ConnectyCube);
    const CREDENTIALS = {
      appId: 4974,
      authKey: "4uK2wqdYd9nKunx",
      authSecret: "Xu5K23tUUH3pdNu"
    };

    this.ConnectyCube.init(CREDENTIALS);
  }

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
        console.log('User session ceated');
        console.log(session);
        sessionStorage.setItem('user_session', session);
      })
      .catch((error) => {
        console.log(error)
      });
  }

  signUp(user) {
    const userProfile = {
      login: user.username,
      password: user.password,
      email: user.email,
      full_name: user.username,
      phone: user.phone
    };

    this.ConnectyCube.users
      .signup(userProfile)
      .then((user) => {
        console.log('User signed in');
        console.log(user);
        this.user = new User();
        this.user.setUser(user);
        console.log(this.user.getUser());
      })
      .catch((error) => {
        console.log(error);
      });
  }

  logout() {
    this.ConnectyCube.destroySession(() => {
      console.log('User session over')
      sessionStorage.removeItem('user_session')
    }).catch((error) => { });

  }

  getUserByLogin(username, callback) {
    const searchParams = { login: username };

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

  connectToChat() {
    const userCredentials = {
      userId: this.user.getUser().user.id,
      password: '7389330512'
    };

    console.log(this.user.getUser().user.id);

    this.ConnectyCube.chat.connect(userCredentials).then(() => {
      console.log('Connected to chat');
    }).catch((error) => {
      console.log(error);
    });
  }

  isConnected() {
    const isConnected = this.ConnectyCube.chat.isConnected;
    return isConnected;
  }

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
        console.log(dialog)
      })
      .catch((error) => {
        console.log(error)
      });
  }

  getAllDialog() {
    const filters = {};

    this.ConnectyCube.chat.dialog
      .list(filters)
      .then((result) => { 
        console.log(result)
      })
      .catch((error) => {
        console.log(error)
       });
  }

  


}
