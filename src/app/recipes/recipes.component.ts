import {Component, OnInit} from '@angular/core';
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

  @Select(RecipesState.recipes)
  recipes$: Observable<Recipe[]>;

  updateRecipe = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    estimatedTime: new FormControl(''),
    ingredients: new FormArray([]),
  });
  editState = false;
  recipeToEdit: Recipe;

  constructor(private recipesService: RecipesService,
              private router: Router,
              private formBuilder: FormBuilder,
              private store: Store) {
  }

  get ingredients() {
    return this.updateRecipe.get('ingredients') as FormArray;
  }

  ngOnInit() {

    this.store.dispatch(new GetAllRecipes());

    this.updateRecipe = this.formBuilder.group({
      id: '',
      name: '',
      estimatedTime: 0,
      ingName: '',
      ingAmount: 0,
      ingredients: this.formBuilder.array([])
    });
  }

  editItem(event: Event, recipe: Recipe) {
    console.log(recipe);
    this.editState = true;
    this.recipeToEdit = recipe;
    this.updateRecipe.patchValue({id: recipe.id});
    this.updateRecipe.patchValue({name: recipe.name});
    this.updateRecipe.patchValue({estimatedTime: recipe.estimatedTime});
    this.updateRecipe.value.ingredients.fill(recipe.ingredients);
    const formArray = new FormArray([]);
    for (const ing of recipe.ingredients) {
      const ingredient = this.formBuilder.group({
        name: ing.name,
        amount: ing.amount
      });
      formArray.push(ingredient);
    }
    this.updateRecipe.setControl('ingredients', formArray);

    // this.ingredients.clear();
    // this.ingredients.
    // this.updateRecipe.patchValue({ingredients: recipe.ingredients});
    console.log(this.updateRecipe);
  }

  clearState() {
    this.editState = false;
    this.recipeToEdit = null;
  }

  addIngredient() {
    const ingredient = this.formBuilder.group({
      name: '',
      amount: '',
    });
    this.ingredients.push(ingredient);
  }


  submitHandler() {
    const info = {
      id: this.recipeToEdit.id,
      name: this.updateRecipe.value.name,
      estimatedTime: this.updateRecipe.value.estimatedTime,
      ingredients: this.updateRecipe.value.ingredients
    } as Recipe;
    console.log(info);
    this.recipesService.updateRecipe(info);
    this.clearState();
  }

  deleteIngredient(i) {
    this.ingredients.removeAt(i);
  }


  deleteRecipe(recipe: Recipe) {
    this.recipesService.deleteRecipe(recipe);
    this.editState = false;
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}
