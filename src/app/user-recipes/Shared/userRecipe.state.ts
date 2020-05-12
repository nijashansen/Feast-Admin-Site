import {UserRecipe} from './userRecipe';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {UserRecipeService} from './user-recipe.service';
import {AddUserRecipe, DeleteUserRecipe, GetAllRecipesForUser, UpdateUserRecipe} from './userRecipes.action';
import {tap} from 'rxjs/operators';
import {patch} from '@ngxs/store/operators';

export class UserRecipeStateModel {
  userRecipes: UserRecipe[];
}

@State<UserRecipeStateModel>({
  name: 'userRecipes',

  defaults: {
    userRecipes: []
  }
})

@Injectable()
export class UserRecipeState {
  constructor(private service: UserRecipeService) {
  }


  @Selector()
  static UserRecipes(state: UserRecipeStateModel) {
    return state.userRecipes;
  }

  @Action(GetAllRecipesForUser)
  getAllRecipesForUser({getState, setState}: StateContext<UserRecipeStateModel>, action: GetAllRecipesForUser) {
  return this.service.getAllRecipesForUser(action.userId).pipe(tap(recipes => {
      const state = getState();
      setState({
        ...state,
        userRecipes: recipes
      });
    }));
  }


  @Action(DeleteUserRecipe)
  deleteUserRecipe({getState, setState}: StateContext<UserRecipeStateModel>, action: DeleteUserRecipe) {
   this.service.deleteUserRecipe(action.uid);
  }


  @Action(UpdateUserRecipe)
  updateUserRecipe({getState, setState}: StateContext<UserRecipeStateModel>, action: UpdateUserRecipe) {
    this.service.updateUserRecipe(action.userRecipe);
  }

  @Action(AddUserRecipe)
  addUserRecipe({getState, setState}: StateContext<UserRecipeStateModel>, action: AddUserRecipe) {
    this.service.addUserRecipe(action.userRecipe);
  }


}
