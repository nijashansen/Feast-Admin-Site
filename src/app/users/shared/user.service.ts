import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {from, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {User} from "./user";
import {AngularFireAuth} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: Observable<User[]>;

  constructor(private fs: AngularFirestore) {
  }

  getAllUsers(): Observable<User[]> {
    return this.fs.collection<User>('Users').snapshotChanges().pipe(map(data => {
      const newArray: User[] = [];
      data.forEach(doc => {
        newArray.push({
          uid: doc.payload.doc.id,
          name: doc.payload.doc.data().name
        });
      });
      return newArray;
    }));
  }

  addUser(user: User): Observable<User> {
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


  deleteUser(user: User): Observable<User> {
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


  updateUser(user: User): Observable<User> {
    return from( this.fs.doc(`Users/${user.uid}`).update(user)).
    pipe( map(() => {
      return user; }
    ));

  }
}
