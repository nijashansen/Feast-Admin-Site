import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UserRecipesComponent} from './user-recipes.component';
import {AddUserRecipeComponent} from './add-user-recipe/add-user-recipe.component';

const routes: Routes =
  [
    {
      path: ':uid',
      component: UserRecipesComponent
    },
    {
      path: 'add/:uid',
      component: AddUserRecipeComponent
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRecipesRoutingModule {
}
