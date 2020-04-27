import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {User} from "./user";
import {Recipe} from "../../recipes/Shared/recipe";

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
}
