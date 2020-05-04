import {AuthUser} from './user';


export class GetAllUsers {
  static readonly type = '[AuthUser] GetAllUsers';

  constructor() {
  }
}

export class DeleteUser {
  static readonly type = '[AuthUser] DeleteUser';

  constructor(public user: AuthUser) {
  }
}

export class CreateUser {
  static readonly type = '[AuthUser] CreateUser';

  constructor(public email: string, public password: string, public user: AuthUser) {
  }
}

export class UpdateUser {
  static readonly type = '[AuthUser] UpdateUser';

  constructor(public user: AuthUser) {
  }
}

export class GetNextSetOfUsers {
  static readonly type = '[AuthUser] GetNextSetOfUsers';

  constructor(public lastVisible: string) {
  }
}

export class GetPriorSetOfUsers {
  static readonly type = '[AuthUser] GetPriorSetOfUsers';

  constructor(public firstVisible: string) {
  }
}
