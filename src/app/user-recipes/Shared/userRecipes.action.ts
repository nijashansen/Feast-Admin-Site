import {UserRecipe} from './userRecipe';


export class GetAllRecipesForUser {
  static readonly type = '[userRecipes[]] GetAllRecipesForUser';

  constructor(public userId: string) {
  }
}

export class AddUserRecipe {

  static readonly type = '[UserRecipe] AddUserRecipe';

  constructor(public recipe: UserRecipe) {
  }

}

export class DeleteUserRecipe {

  static readonly type = '[userRecipe] DeleteUserRecipe';

  constructor(public recipe: string) {
  }
}


export class UpdateUserRecipe {

  static readonly type = '[userRecipe] UpdateUserRecipe';

  constructor(public recipe: UserRecipe) {
  }
}
