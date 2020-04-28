import { Component, OnInit } from '@angular/core';
import {UserService} from "./shared/user.service";
import {Observable} from "rxjs";
import {AuthUser} from "./shared/user";
import {Router} from "@angular/router";



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users$: Observable<AuthUser[]>

  editState: boolean = false;
  userToEdit: AuthUser;

  constructor(private us: UserService, private router: Router) { }

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

  updateUser(user: AuthUser) {
    this.us.updateUser(user);
    this.clearState();
  }

  deleteItem($event: MouseEvent, user: AuthUser) {
    this.clearState();
    this.us.deleteUser(user);
  }

  goToUserAdd() {
    console.log('user add module')
    this.router.navigate(['users/add']);
  }

  goToHome() {
    this.router.navigate(['/home'])
  }
}
