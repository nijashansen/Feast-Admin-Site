import {Injectable} from '@angular/core';
import {AuthUser} from './user';
import {from, Observable, of} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {catchError, map, tap} from 'rxjs/operators';
import {AuthenticationService} from '../../services/authentication.service';
import {UserPage} from './UserPage';
import {AngularFireAuth} from "@angular/fire/auth";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: Observable<AuthUser[]>;

  newArray: AuthUser[] = [];


  constructor(private fs: AngularFirestore, private auth: AuthenticationService, private afAuth: AngularFireAuth) {
  }


  getAllUsers(): Observable<UserPage> {
    return this.fs.collection<AuthUser>('Users',
      ref => ref.orderBy('email')
        .limit(5)).snapshotChanges().pipe(map(data => {
      this.newArray = [];
      data.forEach(doc => {
        this.newArray.push({
          uid: doc.payload.doc.id,
          name: doc.payload.doc.data().name,
          email: doc.payload.doc.data().email,
          role: doc.payload.doc.data().role
        });
      });
      return {
        users: this.newArray,
        lastVisible: data[data.length - 1].payload.doc.data().email,
        firstVisible: data[0].payload.doc.data().email
      } as UserPage;
    }));
  }

  getLastUser(): Observable<string> {
    return this.fs.collection<AuthUser>('Users', ref => ref.orderBy('email', 'desc')
      .limit(1)).valueChanges().pipe(map(data => {
      console.log(data);
      return data[0].email; // .payload.doc.data().email;
    }));
  }

  getFirstUser(): Observable<string> {
    return this.fs.collection<AuthUser>('Users', ref => ref.orderBy('email')
      .limit(1)).valueChanges().pipe(map(data => {
      return data[0].email; //.payload.doc.data().email;
    }));
  }

  deleteUser(user: AuthUser): Observable<AuthUser> {
    return from(
      this.fs
        .doc(`Users/${user.uid}`)
        .delete()
    ).pipe(
      map(() => {
        return user;
      })
    );
  }

  updateUser(user: AuthUser): Observable<AuthUser> {
    return from(this.fs.doc(`Users/${user.uid}`).update(user)).pipe(map(() => {
        return user;
      }
    ));
  }

  getNextSetOfUsers(lastVisible: string) {
    return this.fs.collection<AuthUser>('Users',
      ref => ref.orderBy('email').startAfter(lastVisible)
        .limit(5)).snapshotChanges().pipe(map(data => {
      if (data.length > 0) {
        this.newArray = [];
        data.forEach(doc => {
          this.newArray.push({
            uid: doc.payload.doc.id,
            name: doc.payload.doc.data().name,
            email: doc.payload.doc.data().email,
            role: doc.payload.doc.data().role
          });
        });
        return {
          users: this.newArray,
          lastVisible: data[data.length - 1].payload.doc.data().email,
          firstVisible: data[0].payload.doc.data().email
        } as UserPage;
      }
    })).pipe(catchError(err => {
      console.log(err);
      return of(null);
    }));
  }

  getPriorSetOfUsers(firstVisible: string) {
    return this.fs.collection<AuthUser>('Users',
      ref => ref.orderBy('email').endBefore(firstVisible)
        .limitToLast(5)).snapshotChanges().pipe(map(data => {
      if (data.length > 0) {
        this.newArray = [];
        data.forEach(doc => {
          this.newArray.push({
            uid: doc.payload.doc.id,
            name: doc.payload.doc.data().name,
            email: doc.payload.doc.data().email,
            role: doc.payload.doc.data().role
          });
        });
        return {
          users: this.newArray,
          lastVisible: data[data.length - 1].payload.doc.data().email,
          firstVisible: data[0].payload.doc.data().email
        } as UserPage;
      }
    })).pipe(catchError(err => {
      console.log(err);
      return of(null);
    }));
  }

  async createUserWithEmailAndPassword(email: string, password: string, user: AuthUser) {
    const cred = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );

    return this.fs.doc(`Users/${cred.user.uid}`).set({
      email: cred.user.email,
      name: user.name,
      role: user.role,
    })
  }
}
