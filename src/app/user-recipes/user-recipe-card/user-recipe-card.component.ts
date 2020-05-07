import {Component, Input, OnInit} from '@angular/core';
import {UserRecipe} from '../Shared/userRecipe';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserRecipeService} from '../Shared/user-recipe.service';

@Component({
  selector: 'app-user-recipe-card',
  templateUrl: './user-recipe-card.component.html',
  styleUrls: ['./user-recipe-card.component.css']
})
export class UserRecipeCardComponent implements OnInit {

  @Input() userRecipe: UserRecipe;
  active: boolean;

  updateRecipe: FormGroup;
  public edit: boolean;

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private urService: UserRecipeService) {
    this.active = false;
    this.edit = false;
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

  ngOnInit(): void {
    this.updateRecipe = new FormGroup({
      id: new FormControl(this.userRecipe.id, [Validators.required]),
      name: new FormControl(this.userRecipe.name, [Validators.required]),
      estimatedTime: new FormControl(this.userRecipe.estimatedTime, [Validators.required, Validators.min(1)]),
      userId: new FormControl(this.userRecipe.userId, [Validators.required]),
      ingredients: new FormArray([])
    });
    const formArray = new FormArray([]);
    for (const ing of this.userRecipe.ingredients) {
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


  deleteIngredient(i) {
    this.ingredients.removeAt(i);
  }

  addIngredient() {
    const ingredient = new FormGroup({
      name: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required, Validators.min(1)])
    });
    this.ingredients.push(ingredient);
  }

  onEdit() {
    this.edit = true;
  }

  submitHandler() {
    if (this.updateRecipe.valid) {
      const updated = this.updateRecipe.value;
      console.log(updated);
      this.urService.updateUserRecipe(updated)
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

  public onCancel() {
    this.edit = false;
    this.updateRecipe.patchValue({id: this.userRecipe.id});
    this.updateRecipe.patchValue({name: this.userRecipe.name});
    this.updateRecipe.patchValue({estimatedTime: this.userRecipe.estimatedTime});
    this.updateRecipe.patchValue({userId: this.userRecipe.estimatedTime});
    const formArray = new FormArray([]);
    for (const ing of this.userRecipe.ingredients) {
      const ingredient = new FormGroup({
        name: new FormControl('', [Validators.required]),
        amount: new FormControl('', [Validators.required, Validators.min(1)])
      });
      formArray.push(ingredient);
    }
    this.updateRecipe.setControl('ingredients', formArray);
  }

  public onDelete() {
    this.urService.deleteUserRecipe(this.userRecipe.id)
      .then(() => {
        this.snackBar.open('Recipe was Deleted', '',
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
