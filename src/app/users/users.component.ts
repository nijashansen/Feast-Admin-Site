import { Component, OnInit } from '@angular/core';
import {UserService} from "./shared/user.service";
import {Observable} from "rxjs";
import {AuthUser} from "./shared/user";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users$: Observable<AuthUser[]>

  editState: boolean = false;
  userToEdit: User;

  constructor(private us: UserService) { }

  ngOnInit(): void {
    this.users$ = this.us.getAllUsers();
  }

  editUser(event, user){
    this.editState = true;
    this.userToEdit = user;
  }

  clearState() {
    this.editState = false;
    this.userToEdit = null;
  }

  updateUser(user: User) {
    this.us.updateUser(user);
    this.clearState();
  }

  deleteItem($event: MouseEvent, user: User) {
    this.clearState();
    this.us.deleteUser(user);
  }



}
