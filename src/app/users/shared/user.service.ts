import {Injectable} from "@angular/core";
import {AuthUser} from "./user";
import {from, Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: Observable<AuthUser[]>;

  newArray: AuthUser[] = []

  constructor(private fs: AngularFirestore) {
  }

  getAllUsers(): Observable<AuthUser[]> {
    return this.fs.collection<AuthUser>('Users',
        ref => ref.orderBy('name')
          .limit(5)).snapshotChanges().pipe(map(data => {
      this.newArray = [];
      data.forEach(doc => {
        this.newArray.push({
          uid: doc.payload.doc.id,
          name: doc.payload.doc.data().name,
          email: doc.payload.doc.data().email
        });
      });
      return this.newArray;
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
    return this.fs.collection<AuthUser>('Users',
        ref => ref.orderBy('name')
          .startAfter(ref.id)
          .limitToLast(5)).snapshotChanges().pipe(map(data => {
            this.newArray = []
      data.forEach(doc => {
        this.newArray.push({
          uid: doc.payload.doc.id,
          name: doc.payload.doc.data().name,
          email: doc.payload.doc.data().email
        });
      });
      return this.newArray;
    }));
  }
}
