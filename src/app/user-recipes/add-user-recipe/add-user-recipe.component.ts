import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {UserRecipeService} from '../Shared/user-recipe.service';
import {UserRecipe} from '../Shared/userRecipe';
import {UserRecipesComponent} from '../user-recipes.component';

@Component({
  selector: 'app-add-user-recipe',
  templateUrl: './add-user-recipe.component.html',
  styleUrls: ['./add-user-recipe.component.css']
})
export class AddUserRecipeComponent implements OnInit {

  form: FormGroup;
  recipe: UserRecipe = {
    ingredients: [],
    estimatedTime: 0,
    name: '',
    userId: this.userRecipe.getUserId().toString()
  };

  constructor(private formBuilder: FormBuilder, private userRecipeService: UserRecipeService, private userRecipe: UserRecipesComponent) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      name: '',
      estimatedTime: 0,
      userId: this.userRecipe.getUserId(),
      ingredients: this.formBuilder.array([])

    });
  }

  get ingredients() {
    return this.form.get('ingredients') as FormArray;
  }

 addIngredient() {
    const ingredient = this.formBuilder.group({
      name: '',
      amount: 0
    });
    this.ingredients.push(ingredient);

  }

  deleteIngredient(i) {
    this.ingredients.removeAt(i);
  }


  async submitHandler() {
    this.recipe = this.form.value;

    try {
      this.userRecipeService.addUserRecipe(this.recipe);


    } catch (err) {
      console.error(err);
    }

  }
}
