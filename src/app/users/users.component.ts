import {AuthUser} from './shared/user';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {DeleteUser, GetAllUsers, GetNextSetOfUsers, GetPriorSetOfUsers, UpdateUser} from './shared/user.action';
import {UserState} from './shared/user.state';
import {AngularFirestore} from '@angular/fire/firestore';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {roles} from '../../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';


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
  roles: string[];

  editState: boolean;
  userToEdit: AuthUser;
  page: number;

  updateUserForm = new FormGroup({
    uid: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl(''),
    role: new FormControl('')
  });


  constructor(private store: Store,
              public router: Router,
              public fs: AngularFirestore,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar) {
    this.editState = false;

    this.roles = [];

    this.roles.push(roles.standard, roles.admin);
  }

  ngOnInit(): void {
    this.store.dispatch(new GetAllUsers());
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

    this.updateUserForm = this.formBuilder.group({
      uid: '',
      name: '',
      email: '',
      role: ''
    });
  }

  editUser(event, user: AuthUser) {
    this.editState = true;
    this.userToEdit = user;

    this.updateUserForm.patchValue({uid: user.uid});
    this.updateUserForm.patchValue({name: user.name});
    this.updateUserForm.patchValue({email: user.email});
    this.updateUserForm.patchValue({role: user.role});

  }

  clearState() {
    this.editState = false;
    this.userToEdit = null;
  }

  updateUser() {
    const info = {
      uid: this.updateUserForm.value.uid,
      name: this.updateUserForm.value.name,
      email: this.updateUserForm.value.email,
      role: this.updateUserForm.value.role
    } as AuthUser;

    this.store.dispatch(new UpdateUser(info)).toPromise()
      .then(() => {
        this.snackBar.open('success', '', {duration: 6000, panelClass: ['success']});
        this.router.navigate(['/users']);
      })
      .catch(e =>
        this.snackBar.open(e, 'ok', {duration: 6000, panelClass: ['fail']}));
    this.clearState();
  }

  deleteItem($event: MouseEvent, user: AuthUser) {
    this.clearState();
    this.store.dispatch(new DeleteUser(user)).toPromise()
      .then(() => {
        this.snackBar.open('success', '', {duration: 6000, panelClass: ['success']});
        this.router.navigate(['/users']);
      })
      .catch(e =>
        this.snackBar.open(e, 'ok', {duration: 6000, panelClass: ['fail']}));
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
    this.router.navigate(['/user-recipe', uid]);
  }
}
