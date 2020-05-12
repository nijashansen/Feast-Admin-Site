import {UserRecipe} from './userRecipe';


export class GetAllRecipesForUser {
  static readonly type = '[userRecipes[]] GetAllRecipesForUser';

  constructor(public userId: string) {
  }
}

export class AddUserRecipe {

  static readonly type = '[void] AddUserRecipe';

  constructor(public userRecipe: UserRecipe) {
  }

}

export class DeleteUserRecipe {

  static readonly type = '[void] DeleteUserRecipe';

  constructor(public uid: string) {
  }
}


export class UpdateUserRecipe {

  static readonly type = '[void] UpdateUserRecipe';

  constructor(public userRecipe: UserRecipe) {
  }
}
