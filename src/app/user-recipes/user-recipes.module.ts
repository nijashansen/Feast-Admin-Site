import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRecipesRoutingModule} from './user-recipes-routing.module';
import {UserRecipesComponent} from './user-recipes.component';
import {AddUserRecipeComponent} from './add-user-recipe/add-user-recipe.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {UserRecipeCardComponent} from './user-recipe-card/user-recipe-card.component';
import {MatDividerModule} from '@angular/material/divider';


@NgModule({
  declarations: [UserRecipesComponent, AddUserRecipeComponent, UserRecipeCardComponent],
  imports: [
    CommonModule,
    UserRecipesRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule
  ]
})
export class UserRecipesModule {
}
