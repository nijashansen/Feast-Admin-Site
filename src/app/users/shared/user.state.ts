
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';

import {CreateUser, DeleteUser, GetAllUsers, GetNextSetOfUsers, UpdateUser} from "./user.action";
import {first, last, tap} from "rxjs/operators";
import {AuthUser} from "./user";
import {UserService} from "./user.service";
import set = Reflect.set;

export class UserStateModel {
  users: AuthUser[];
  requestSent: boolean;
}

@State<UserStateModel>({
  name: 'users',
  defaults: {
    users: [],
    requestSent: false
  }
})

@Injectable()
export class UserState {

  constructor(private userService: UserService) {}

  @Selector()
  static users(state: UserStateModel){
    return state.users;
  }

  @Selector()
  static requestSent(state: UserStateModel) {
    return state.requestSent;
  }


  @Action(GetAllUsers)
  getAllUsers({getState, setState}: StateContext<UserStateModel>){
    const state = getState();
    return this.userService
      .getAllUsers().pipe(
        tap(allUsers => {
          setState({
            ...state,
            users: allUsers,
          });
        })
      );
  }


  @Action(DeleteUser)
  deleteUser({getState, setState, dispatch}: StateContext<UserStateModel>, action: DeleteUser){
    return this.userService.deleteUser(action.user);
  }


  @Action(CreateUser)
  createUser({getState, setState, dispatch}: StateContext<UserStateModel>, action: CreateUser){
    return this.userService.createUserWithEmailAndPassword(action.email, action.password, action.name)

  }

  @Action(UpdateUser)
  updateUser({getState, setState, dispatch}: StateContext<UserStateModel>, action: UpdateUser){
    const state = getState();
    return this.userService.updateUser(action.user).pipe(
      tap(() => {
        setState({
          ...state,
        });
      })
    );
  }

  @Action(GetNextSetOfUsers)
  getNextSetOfUsers({getState, setState}: StateContext<UserStateModel>){
    const state = getState();
    return this.userService
      .getNextSetOfUsers().pipe(
        tap(allUsers => {
          setState({
            ...state,
            users: allUsers,
          });
        })
      );
  }
}

