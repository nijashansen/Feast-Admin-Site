import {Recipe} from "./recipe";


export class GetAllRecipes {
 static readonly type = '[Recipes[]] GetAllRecipes';

 constructor() {
 }
}

export class DeleteRecipe {
  static readonly type = '[Recipes] DeleteRecipe';

  constructor(public recipe: Recipe) {}
}

export class CreateRecipe {
  static readonly type = '[Recipes] CreateRecipe';

  constructor(public recipe: Recipe) {}
}

export class UpdateRecipe {
  static readonly type = '[Recipes] UpdateRecipe';

  constructor(public recipe: Recipe) {
  }
}

