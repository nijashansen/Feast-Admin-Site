import {AuthUser} from './shared/user';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {DeleteUser, GetAllUsers, GetNextSetOfUsers, GetPriorSetOfUsers, UpdateUser} from './shared/user.action';
import {UserState} from './shared/user.state';
import {AngularFirestore} from '@angular/fire/firestore';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @Select(UserState.users) users$: Observable<AuthUser[]>;
  @Select(UserState.firstVisible) lastVisible$: Observable<string>;
  @Select(UserState.lastVisible) firstVisible$: Observable<string>;
  @Select(UserState.page) page$: Observable<number>;

  lastUser: string;
  firstUser: string;
  lastItem: string;
  firstItem: string;

  editState: boolean;
  userToEdit: AuthUser;
  page: number;


  constructor(private store: Store, private router: Router, public fs: AngularFirestore) {
    this.editState = false;
  }

  ngOnInit(): void {
    this.store.dispatch(new GetAllUsers());
    // this.store.dispatch(new GetFirstUser());
    // this.store.dispatch(new GetLastUser());
    this.lastVisible$.subscribe(value => {
      this.lastUser = value;
    });
    this.lastVisible$.subscribe(value => {
      this.lastUser = value;
    });
    this.firstVisible$.subscribe(value => {
      this.firstUser = value;
    });
    this.page$.subscribe(value => {
      console.log(value);
    });
  }

  editUser(event, user) {
    this.editState = true;
    this.userToEdit = user;
  }

  clearState() {
    this.editState = false;
    this.userToEdit = null;
  }

  updateUser(user: AuthUser) {
    this.store.dispatch(new UpdateUser(user));
    this.clearState();
  }

  deleteItem($event: MouseEvent, user: AuthUser) {
    this.clearState();
    this.store.dispatch(new DeleteUser(user));
  }

  goToUserAdd() {
    this.router.navigate(['users/add']);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  async getNextSetOfUsers() {
    try {
      this.store.dispatch(new GetNextSetOfUsers(this.lastUser));
    } catch (e) {
      console.warn(e);
    }
  }

  getPrevSetOfUsers() {
    try {
      this.store.dispatch(new GetPriorSetOfUsers(this.firstUser));
    } catch (e) {
      console.warn(e);
    }
  }


  onSelect(uid: string) {
  this.router.navigate(['/userRecipes', uid]);
  }
}
