import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    public afAuth: AngularFireAuth,
  ) {}

  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }

  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result: any) => {
        localStorage.setItem('user',result.additionalUserInfo.profile)!;
        console.log('You have benn successfully logged in!');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  userLogged() {
    return JSON.parse(localStorage.getItem('user')!);
  }
}
