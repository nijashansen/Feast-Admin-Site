import {AuthUser} from "./shared/user";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Component, OnInit} from "@angular/core";
import {Select, Store} from "@ngxs/store";
import {DeleteUser, GetAllUsers, UpdateUser} from "./shared/user.action";
import {UserState} from "./shared/user.state";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @Select(UserState.users)
  users$: Observable<AuthUser[]>

  editState: boolean = false;
  userToEdit: AuthUser;

  constructor(private store: Store, private router: Router) { }

  ngOnInit(): void {
    this.store.dispatch(new GetAllUsers())
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
    this.router.navigate(['/home'])
  }

  getNextSetOfUsers() {
    this.users$ = this.us.getNextSetOfUsers();
  }

  getPrevSetOfUsers() {
    this.users$ = this.us.getAllUsers();
  }


}
