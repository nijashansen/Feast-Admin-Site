import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';
import {User} from 'firebase';
import {AngularFirestore} from '@angular/fire/firestore';
import {from, Observable} from 'rxjs';
import {AuthUser} from '../users/shared/user';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authState = null;

  constructor(public afAuth: AngularFireAuth, private fs: AngularFirestore) {
  }

  singInWithGoogle() {
    this.authState = this.afAuth.authState;
    return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(cred => {
      this.fs.collection('Users').doc(cred.user.uid).set({
        email: cred.user.email,
        name: cred.user.displayName
      });
    });
  }

  signOut() {
    return from(this.afAuth.signOut());
  }

  getUser(): Observable<AuthUser> {
    const authUser$ = this.afAuth.authState
      .pipe(map(
        cred => this.firebaseUserToAuthUser(cred)
      ));
    return authUser$ as Observable<AuthUser>;
  }

  private firebaseUserToAuthUser(user: User): AuthUser {
    if (user) {
      return {
        name: user.displayName,
        uid: user.uid,
        email: user.email
      };
    }
  }

  signInWithEmailPassword(email: string, password: string) {
    this.authState = this.afAuth.authState;
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  createUserWithEmailAndPassword(email: string, password: string, name?: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password).then(cred => {
      this.fs.collection('Users').doc(cred.user.uid).set({
        name: name,
        email: cred.user.email
      });
    });
  }
}
