import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Recipe} from './Shared/recipe';
import {RecipesService} from './Shared/recipes.service';
import {Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Select, Store} from '@ngxs/store';
import {GetAllRecipes} from './Shared/recipe.action';
import {RecipesState} from './Shared/recipes.state';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})



export class RecipesComponent implements OnInit {

  //@Select(RecipesState.recipes)
  recipes$: Observable<Recipe[]>;

  updateRecipe = new FormGroup({
    name: new FormControl(''),
    estimatedTime: new FormControl(''),
    ingredients: new FormArray([]),
});



  constructor(private recipesService: RecipesService, private router: Router, private formBuilder: FormBuilder, private store: Store ) { }
  editState = false;
  recipeToEdit: Recipe;



  ngOnInit(){
this.recipes$ = this.recipesService.getAllRecipes();
//this.store.dispatch(new GetAllRecipes());

this.updateRecipe = this.formBuilder.group({
      name: '',
      estimatedTime: 0,
    ingredients: this.formBuilder.array([this.addIngToForm()]),


    });
  }

  editItem(event: Event, recipe: Recipe){
    this.editState = true;
    this.recipeToEdit = recipe;
  }

  clearState() {
    this.editState = false;
    this.recipeToEdit = null;
  }

  get ingredients(){
    return this.updateRecipe.get('ingredients') as FormArray;
  }



  addIngToForm(){
    const ing = this.formBuilder.group({
      ingName: new FormControl(),
      ingAmount: new FormControl()}
      );
    this.ingredients.push(ing);
  }


  async submitHandler(recipe: Recipe) {
  this.recipesService.updateRecipe(recipe);
  this.clearState();
  }

  deleteIngredient(i){
    this.ingredients.removeAt(i);
  }


  deleteRecipe(recipe: Recipe) {
    this.recipesService.deleteRecipe(recipe);
    this.editState = false;
  }

  goToHome() {
    this.router.navigate(['/home'])
  }
}
