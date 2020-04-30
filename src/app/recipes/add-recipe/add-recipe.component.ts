import { Component, OnInit } from '@angular/core';
import {Recipe} from '../Shared/recipe';
import {RecipesService} from '../Shared/recipes.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {


  form: FormGroup;
  recipe: Recipe = {
    ingredients: [],
    estimatedTime: 0,
    name: '',
  };

  loading = false;
  success = false;

  constructor(private recipesService: RecipesService,  private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      estimatedTime: 0,
      ingredients: this.formBuilder.array([])

    });

  }

  get ingredients(){
    return this.form.get('ingredients') as FormArray;
  }

  addIngredient(){
    const ingredient = this.formBuilder.group({
      name: '',
      amount: 0
    });
    this.ingredients.push(ingredient);
  }

  deleteIngredient(i){
    this.ingredients.removeAt(i);
  }


  async submitHandler() {


    this.recipe = this.form.value;

    try {
      this.recipesService.addRecipe(this.recipe);

    } catch (err) {
      console.error(err);
    }

    this.loading = false;
  }

}
