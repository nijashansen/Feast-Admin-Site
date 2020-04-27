import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {from, Observable} from "rxjs";
import {map} from "rxjs/operators";

import {AngularFireAuth} from "@angular/fire/auth";
import {AuthUser} from "./user";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: Observable<AuthUser[]>;

  constructor(private fs: AngularFirestore) {
  }

  getAllUsers(): Observable<AuthUser[]> {
    return this.fs.collection<AuthUser>('Users').snapshotChanges().pipe(map(data => {
      const newArray: AuthUser[] = [];
      data.forEach(doc => {
        newArray.push({
          uid: doc.payload.doc.id,
          name: doc.payload.doc.data().name
        });
      });
      return newArray;
    }));
  }

  addUser(user: AuthUser): Observable<AuthUser> {
    return from(
      this.fs
        .collection('Users')
        .add(user)
    ).pipe(
      map(() => {
        return user;
      })
    );
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
    return from( this.fs.doc(`Users/${user.uid}`).update(user)).
    pipe( map(() => {
      return user; }
    ));

  }
}
