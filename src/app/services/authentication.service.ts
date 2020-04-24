import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import * as firebase from "firebase";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authState = null

  constructor(public afAuth: AngularFireAuth) { }

  singInWithGoogle() {
    this.authState = this.afAuth.authState;
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }

  signOut() {
    this.afAuth.signOut();
  }

  signInWithEmailPassword(email: string, password: string) {
    this.authState = this.afAuth.authState;
    this.afAuth.signInWithEmailAndPassword(email, password);
  }

  createUserWithEmailAndPassword(email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password);
  }
}
