import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';
import {auth, User} from 'firebase';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {from, Observable, of} from 'rxjs';
import {AuthUser} from '../users/shared/user';
import {map, switchMap} from 'rxjs/operators';
import UserCredential = firebase.auth.UserCredential;
import {roles} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authState = null;
  public authUser$: Observable<AuthUser>;

  constructor(public afAuth: AngularFireAuth, private fs: AngularFirestore) {

    this.authUser$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.fs.doc<AuthUser>(`Users/${user.uid}`)
            .valueChanges().pipe(map(value => {
              value.uid = user.uid;
              return value;
            }));
        } else {
          return of(null);
        }
      })
    );

  }

  async singInWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    const cred = await this.afAuth.signInWithPopup(provider)
    return this.updateUserInfo(cred);
  }

  updateUserInfo(userCred: UserCredential) {
    const userRef: AngularFirestoreDocument<AuthUser> = this.fs.doc(`Users/${userCred.user.uid}`);
    let data: AuthUser

    if (userCred.additionalUserInfo.isNewUser) {
      data = {
        email: userCred.user.email,
        name: userCred.user.displayName,
        role: roles.standard
      };
    } else {
      data = {
        email: userCred.user.email,
        name: userCred.user.displayName
      };
    }

    return userRef.set(data, {merge: true});
  }

  signOut() {
    return from(this.afAuth.signOut());
  }


  async signInWithEmailPassword(email: string, password: string) {
    const cred = await this.afAuth.signInWithEmailAndPassword(email, password);
    return this.updateUserInfo(cred);
  }

  async createUserWithEmailAndPassword(email: string, password: string) {
    const cred = await this.afAuth.createUserWithEmailAndPassword(email, password);
    return this.updateUserInfo(cred);
  }
}
