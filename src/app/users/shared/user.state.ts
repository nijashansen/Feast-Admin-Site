import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';

import {CreateUser, DeleteUser, GetAllUsers, GetNextSetOfUsers, GetPriorSetOfUsers, UpdateUser} from './user.action';
import {tap} from 'rxjs/operators';
import {UserService} from './user.service';
import {AuthUser} from './user';

export class UserStateModel {
  users: AuthUser[];
  requestSent: boolean;
  firstVisible: string;
  lastVisible: string;
  page: number;
}

@State<UserStateModel>({
  name: 'users',
  defaults: {
    users: [],
    requestSent: false,
    firstVisible: '',
    lastVisible: '',
    page: 1
  }
})

@Injectable()
export class UserState {

  constructor(private userService: UserService) {
  }

  @Selector()
  static users(state: UserStateModel) {
    return state.users;
  }

  @Selector()
  static page(state: UserStateModel) {
    return state.page;
  }

  @Selector()
  static lastVisible(state: UserStateModel) {
    return state.firstVisible;
  }

  @Selector()
  static firstVisible(state: UserStateModel) {
    return state.lastVisible;
  }

  @Selector()
  static requestSent(state: UserStateModel) {
    return state.requestSent;
  }


  @Action(GetAllUsers)
  getAllUsers({getState, setState}: StateContext<UserStateModel>) {
    const state = getState();
    return this.userService
      .getAllUsers().pipe(
        tap(userPage => {
          setState({
            ...state,
            page: 1,
            users: userPage.users,
            lastVisible: userPage.lastVisible,
            firstVisible: userPage.firstVisible
          });
        })
      );
  }


  @Action(DeleteUser)
  deleteUser({getState, setState, dispatch}: StateContext<UserStateModel>, action: DeleteUser) {
    return this.userService.deleteUser(action.user);
  }


  @Action(CreateUser)
  createUser({getState, setState, dispatch}: StateContext<UserStateModel>, action: CreateUser) {
    return this.userService.createUserWithEmailAndPassword(action.email, action.password, action.name);

  }

  @Action(UpdateUser)
  updateUser({getState, setState, dispatch}: StateContext<UserStateModel>, action: UpdateUser) {
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
  getNextSetOfUsers({getState, setState}: StateContext<UserStateModel>, action: GetNextSetOfUsers) {
    const state = getState();
    return this.userService
      .getNextSetOfUsers(action.lastVisible).pipe(
        tap(userPage => {
          console.log(userPage);
          if (userPage !== undefined && userPage.users.length > 0) {
            setState({
              ...state,
              users: userPage.users,
              lastVisible: userPage.lastVisible,
              firstVisible: userPage.firstVisible,
              page: state.page + 1
            });
          }
        })
      );
  }

  @Action(GetPriorSetOfUsers)
  getPriorSetOfUsers({getState, setState}: StateContext<UserStateModel>, action: GetPriorSetOfUsers) {
    const state = getState();
    return this.userService
      .getPriorSetOfUsers(action.firstVisible).pipe(
        tap(userPage => {
          if (userPage !== undefined && userPage.users.length > 0) {
            setState({
              ...state,
              users: userPage.users,
              lastVisible: userPage.lastVisible,
              firstVisible: userPage.firstVisible,
              page: state.page - 1
            });
          }
        })
      );
  }
}
