import {Recipe} from './recipe';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {RecipesService} from './recipes.service';
import {CreateRecipe, DeleteRecipe, GetAllRecipes, UpdateRecipe} from './recipe.action';
import {tap} from 'rxjs/operators';
import {patch} from '@ngxs/store/operators';

export class RecipesStateModel {
  recipes: Recipe[];
  requestSent: boolean;
}

@State<RecipesStateModel>({
  name: 'recipes',
  defaults: {
    recipes: [],
    requestSent: false
  }
})

@Injectable()
export class RecipesState {

  constructor(private recipesService: RecipesService) {
  }

  @Selector()
  static recipes(state: RecipesStateModel) {
    return state.recipes;
  }

  @Selector()
  static requestSent(state: RecipesStateModel) {
    return state.requestSent;
  }


  @Action(GetAllRecipes)
  getAllRecipes({getState, setState}: StateContext<RecipesStateModel>) {
    const state = getState();
    return this.recipesService
      .getAllRecipes().pipe(
        tap(allRecipes => {
          setState({
            ...state,
            recipes: allRecipes
          });
        })
      );
  }


  @Action(DeleteRecipe)
  deleteRecipe({getState, setState}: StateContext<RecipesStateModel>, action: DeleteRecipe) {
    return this.recipesService.deleteRecipe(action.recipe);
  }

  @Action(UpdateRecipe)
  updateRecipe({getState, setState}: StateContext<RecipesStateModel>, action: UpdateRecipe) {
    return this.recipesService.updateRecipe(action.recipe);
  }


  @Action(CreateRecipe)
  createRecipe({getState, setState}: StateContext<RecipesStateModel>, action: CreateRecipe) {
    return this.recipesService.addRecipe(action.recipe)
      .pipe(
      tap(() => {
        const state = getState();
        setState(
          patch({
            recipes: [...state.recipes, action.recipe]
          })
        );
      })
    );
  }


}
