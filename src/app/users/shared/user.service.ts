import {Injectable} from '@angular/core';
import {AuthUser} from './user';
import {from, Observable, of} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {catchError, map} from 'rxjs/operators';
import {AuthenticationService} from '../../services/authentication.service';
import {UserPage} from './UserPage';
import {AngularFireAuth} from '@angular/fire/auth';


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
        const user = doc.payload.doc.data() as AuthUser;
        user.uid = doc.payload.doc.id;
        this.newArray.push(user);
      });
      return {
        users: this.newArray,
        lastVisible: data[data.length - 1].payload.doc.data().email,
        firstVisible: data[0].payload.doc.data().email
      } as UserPage;
    }));
  }

  deleteUser(user: AuthUser): Promise<any> {
    return this.fs.doc(`Users/${user.uid}`).delete();
  }

  updateUser(user: AuthUser): Promise<any> {
    return this.fs.doc(`Users/${user.uid}`).update(user);
  }

  getNextSetOfUsers(lastVisible: string) {
    return this.fs.collection<AuthUser>('Users',
      ref => ref.orderBy('email').startAfter(lastVisible)
        .limit(5)).snapshotChanges().pipe(map(data => {
      if (data.length > 0) {
        this.newArray = [];
        data.forEach(doc => {
          const user = doc.payload.doc.data() as AuthUser;
          user.uid = doc.payload.doc.id;
          this.newArray.push(user);
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
          const user = doc.payload.doc.data() as AuthUser;
          user.uid = doc.payload.doc.id;
          this.newArray.push(user);
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
    });
  }
}
