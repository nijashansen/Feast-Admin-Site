import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {User} from "firebase";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;

  constructor(private fs: AngularFirestore) {
    this.userCollection = this.fs.collection('Users', ref => ref.orderBy('name', 'asc'));


    this.users = this.userCollection.snapshotChanges().pipe(map(changes => {
      return changes.map( a => {
        const data = a.payload.doc.data() as User;
        data.uid = a.payload.doc.id;
        return data;
      });
    }));
  }

  getUsers(): Observable<User[]> {
    return this.users;
  }
}
