import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import * as firebase from "firebase";
import {AngularFirestore} from "@angular/fire/firestore";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authState = null

  constructor(public afAuth: AngularFireAuth, private fs: AngularFirestore) { }

  singInWithGoogle() {
    this.authState = this.afAuth.authState;
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(cred => {
      return this.fs.collection('Users').doc(cred.user.uid).set({
        name: cred.user.email
      });
    })
  }

  signOut() {
    this.afAuth.signOut();
  }

  signInWithEmailPassword(email: string, password: string) {
    this.authState = this.afAuth.authState;
    this.afAuth.signInWithEmailAndPassword(email, password);
  }

  createUserWithEmailAndPassword(email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password).then(cred => {
      return this.fs.collection('Users').doc(cred.user.uid).set({
        name: cred.user.email
      });
    });
  }
}
