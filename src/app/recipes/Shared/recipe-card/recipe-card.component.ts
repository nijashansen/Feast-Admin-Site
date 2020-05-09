import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {Recipe} from '../recipe';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DeleteRecipe, UpdateRecipe} from '../recipe.action';


@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent implements OnInit {

  @Input() recipe: Recipe;
  active: boolean;
  updateRecipe: FormGroup;
  public edit: boolean;


  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private store: Store,
              private snackBar: MatSnackBar) {
    this.active = false;
    this.edit = false;
  }


  ngOnInit() {

    this.updateRecipe = new FormGroup({
      id: new FormControl(this.recipe.id, [Validators.required]),
      name: new FormControl(this.recipe.name, [Validators.required]),
      estimatedTime: new FormControl(this.recipe.estimatedTime, [Validators.required, Validators.min(1)]),
      ingredients: new FormArray([])
    });
    const formArray = new FormArray([]);
    for (const ing of this.recipe.ingredients) {
      const ingredient = new FormGroup({
        name: new FormControl(ing.name, [Validators.required]),
        amount: new FormControl(ing.amount, [Validators.required, Validators.min(1)])
      });
      formArray.push(ingredient);
    }
    this.updateRecipe.setControl('ingredients', formArray);
  }


  public switchActivation() {
    this.active = !this.active;
  }

  onEdit() {
    this.edit = true;
  }

  addIngredient() {

    const ingredient = new FormGroup({
      name: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required, Validators.min(1)])
    });
    this.ingredients.push(ingredient);
  }


  submitHandler() {
    if (this.updateRecipe.valid) {
      const updated = this.updateRecipe.value;
      this.store.dispatch(new UpdateRecipe(updated)).toPromise()
        .then(() => {
          this.snackBar.open('Recipe was Updated', '',
            {
              duration: 6000,
              panelClass: ['success']
            });
          this.edit = false;
        })
        .catch(reason => {
          this.snackBar.open(reason, '',
            {
              duration: 6000,
              panelClass: ['fail']
            });
        });
    }
  }

  deleteIngredient(i) {
    this.ingredients.removeAt(i);
  }


  deleteRecipe(recipe: Recipe) {
    this.store.dispatch(new DeleteRecipe(recipe)).toPromise().then(() => this.snackBar.open
    ('success', '', {duration: 600, panelClass: ['success']}))
      .catch(reason => {
        this.snackBar.open(reason, 'ok', {duration: 6000, panelClass: ['fail']});

      });
    this.edit = false;
  }

  public onCancel() {
    this.edit = false;
    this.updateRecipe.patchValue({id: this.recipe.id});
    this.updateRecipe.patchValue({name: this.recipe.name});
    this.updateRecipe.patchValue({estimatedTime: this.recipe.estimatedTime});
    const formArray = new FormArray([]);
    for (const ing of this.recipe.ingredients) {
      const ingredient = new FormGroup({
        name: new FormControl('', [Validators.required]),
        amount: new FormControl('', [Validators.required, Validators.min(1)])
      });
      formArray.push(ingredient);
    }
    this.updateRecipe.setControl('ingredients', formArray);
  }

  get ingredients() {
    return this.updateRecipe.get('ingredients') as FormArray;
  }

  get estimatedTime() {
    return this.updateRecipe.get('estimatedTime') as FormControl;
  }

  get name() {
    return this.updateRecipe.get('name') as FormControl;
  }

}
