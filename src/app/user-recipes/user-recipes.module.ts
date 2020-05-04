import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRecipesRoutingModule} from './user-recipes-routing.module';
import {UserRecipesComponent} from './user-recipes.component';
import { AddUserRecipeComponent } from './add-user-recipe/add-user-recipe.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [UserRecipesComponent, AddUserRecipeComponent],
  imports: [
    CommonModule,
    UserRecipesRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class UserRecipesModule {
}
