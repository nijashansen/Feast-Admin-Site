import {AuthUser} from './shared/user';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {DeleteUser, GetAllUsers, GetNextSetOfUsers, GetPriorSetOfUsers, UpdateUser} from './shared/user.action';
import {UserState} from './shared/user.state';
import {AngularFirestore} from '@angular/fire/firestore';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {roles} from "../../environments/environment";


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



  constructor(private store: Store, private router: Router, public fs: AngularFirestore, private formBuilder: FormBuilder) {
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

    this.store.dispatch(new UpdateUser(info));
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
