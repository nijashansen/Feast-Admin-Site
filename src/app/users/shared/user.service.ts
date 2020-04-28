import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {from, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {AuthUser} from "./user";



@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: Observable<AuthUser[]>;

  constructor(private fs: AngularFirestore) {
  }

  getAllUsers(): Observable<AuthUser[]> {
    return this.fs.collection<AuthUser>('Users', ref => ref.limit(8)).snapshotChanges().pipe(map(data => {
      const newArray: AuthUser[] = [];
      data.forEach(doc => {
        newArray.push({
          uid: doc.payload.doc.id,
          name: doc.payload.doc.data().name,
          email: doc.payload.doc.data().email
        });
      });
      return newArray;
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
    return from( this.fs.doc(`Users/${user.uid}`).update(user)).
    pipe( map(() => {
      return user; }
    ));

  }


  getNextSetOfUsers() {

  }
}
