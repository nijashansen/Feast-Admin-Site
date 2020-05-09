import {UserRecipe} from './userRecipe';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {UserRecipeService} from './user-recipe.service';
import {AddUserRecipe, DeleteUserRecipe, GetAllRecipesForUser, UpdateUserRecipe} from './userRecipes.action';
import {tap} from 'rxjs/operators';
import {patch} from '@ngxs/store/operators';


export class UserRecipeStateModel {
  recipes: UserRecipe[];

}

@State<UserRecipeStateModel>({
  name: 'recipes',
  defaults: {
    recipes: []
  }
})


@Injectable()
export class UserRecipeState {
  constructor(private userRecipesService: UserRecipeService) {
  }

  @Selector()
  static recipes(state: UserRecipeStateModel) {
    return state.recipes;
  }

  @Action(GetAllRecipesForUser)
  getAllRecipesForUser({getState, setState}: StateContext<UserRecipeStateModel>, action: GetAllRecipesForUser){
  return this.userRecipesService.getAllRecipesForUser(action.userId).pipe(tap(recipesFromUser => {
    debugger
    const state = getState();
    setState({
      ...state,
      recipes: recipesFromUser
    });
    }
  ));

  }


  @Action(AddUserRecipe)
  addUserRecipe({getState, setState}: StateContext<UserRecipeStateModel>, action: AddUserRecipe) {
    return this.userRecipesService.addUserRecipe(action.recipe).pipe(tap(result => {
      const state = getState();
      setState(
        patch({
          recipes: [...state.recipes, result]
        })
      );
    }));
  }

  @Action(DeleteUserRecipe)
  deleteUserRecipe({getState, setState}: StateContext<UserRecipeStateModel>, action: DeleteUserRecipe) {
    return this.userRecipesService.deleteUserRecipe(action.recipe).pipe(tap(() => {
      const state = getState();
      const stateArray = state.recipes.filter(item => item.id !== action.recipe);
      setState({
        ...state,
        recipes: stateArray
      });
    }));
  }


  @Action(UpdateUserRecipe)
  updateUserRecipe({getState, setState}: StateContext<UserRecipeStateModel>, action: UpdateUserRecipe) {
    return this.userRecipesService.updateUserRecipe(action.recipe).pipe(tap(result => {
      const state = getState();
      const list = [...state.recipes];
      const index = list.findIndex(item => item.id === action.recipe.id);
      list[index] = result;
      setState({
        ...state,
        recipes: list
      });
    }));
  }


}
