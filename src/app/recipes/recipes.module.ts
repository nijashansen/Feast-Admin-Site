import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [RecipesComponent, AddRecipeComponent],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class RecipesModule { }
