import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {AuthUser} from "./user";
import {Recipe} from "../../recipes/Shared/recipe";

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
}
