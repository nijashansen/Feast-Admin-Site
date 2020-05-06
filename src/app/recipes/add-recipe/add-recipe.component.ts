import {Component, OnInit} from '@angular/core';
import {Recipe} from '../Shared/recipe';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Store} from "@ngxs/store";
import {CreateRecipe} from "../Shared/recipe.action";

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

  constructor( private store: Store, private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      estimatedTime: 0,
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
      this.store.dispatch(new CreateRecipe(this.recipe));

    } catch (err) {
      this.snackBar.open(err, 'ok', {duration: 7000, panelClass: ['fail']})
      console.error(err);
    }
    this.snackBar.open(this.recipe.name + 'Was Added', '', {duration: 600, panelClass: ['success']});

    this.recipe = null;

  }
}
