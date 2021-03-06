import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable, of} from 'rxjs';
import {AuthUser} from '../users/shared/user';
import {map, switchMap} from 'rxjs/operators';
import {roles} from '../../environments/environment';
import UserCredential = firebase.auth.UserCredential;


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public authUser$: Observable<AuthUser>;

  constructor(public afAuth: AngularFireAuth, private fs: AngularFirestore) {

    this.authUser$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.fs.doc<AuthUser>(`Users/${user.uid}`)
            .snapshotChanges().pipe(map(value => {
              if (value) {
                const loggedIn = value.payload.data() as AuthUser;
                loggedIn.uid = user.uid;
                return loggedIn;
              } else {
                return null;
              }
            }));
        } else {
          return of(null);
        }
      })
    );

  }

  async signInGoogle() {
    const provider = new auth.GoogleAuthProvider();
    const cred = await this.afAuth.signInWithPopup(provider);
    return this.updateUserInfo(cred);
  }

  updateUserInfo(userCred: UserCredential) {
    const userRef: AngularFirestoreDocument<AuthUser> = this.fs.doc(`Users/${userCred.user.uid}`);
    let data: AuthUser;

    if (userCred.additionalUserInfo.isNewUser) {
      if (userCred.user.displayName) {
        data = {
          email: userCred.user.email,
          name: userCred.user.displayName,
          role: roles.standard
        };
      } else {
        data = {
          email: userCred.user.email,
          role: roles.standard
        };
      }
    } else {
      data = {
        email: userCred.user.email,
        name: userCred.user.displayName
      };
    }

    return userRef.set(data, {merge: true});
  }

  signOut() {
    return this.afAuth.signOut();
  }


  async signInEmail(email: string, password: string) {
    const cred = await this.afAuth.signInWithEmailAndPassword(email, password);
    return this.updateUserInfo(cred);
  }

  async signUpEmail(email: string, password: string) {
    const cred = await this.afAuth.createUserWithEmailAndPassword(email, password);
    return this.updateUserInfo(cred);
  }

  resetPasswordEmail(email: string) {
    return this.afAuth.sendPasswordResetEmail(email);
  }
}
