import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserRecipeService} from '../Shared/user-recipe.service';
import {Store} from "@ngxs/store";
import {Action} from "rxjs/internal/scheduler/Action";
import {AddUserRecipe} from "../Shared/userRecipes.action";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-user-recipe',
  templateUrl: './add-user-recipe.component.html',
  styleUrls: ['./add-user-recipe.component.css']
})
export class AddUserRecipeComponent implements OnInit {

  @Input() ownerID: string;
  @Output() cancel: EventEmitter<Event> = new EventEmitter<Event>();

  newRecipe = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.min(1)]),
    estimatedTime: new FormControl('', [Validators.required]),
    userId: new FormControl('', [Validators.required]),
    ingredients: new FormArray([], [Validators.required]),
  });

  constructor(private formBuilder: FormBuilder, private store: Store, private snackBar: MatSnackBar) {
  }

  get ingredients() {
    return this.newRecipe.get('ingredients') as FormArray;
  }

  get estimatedTime() {
    return this.newRecipe.get('estimatedTime') as FormControl;
  }

  get name() {
    return this.newRecipe.get('name') as FormControl;
  }

  ngOnInit(): void {
  }

  addIngredient() {
    const ingredient = new FormGroup({
      name: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required, Validators.min(1)])
    });
    this.ingredients.push(ingredient);
  }

  onCancel() {
    this.cancel.emit();
  }

  deleteIngredient(i) {
    this.ingredients.removeAt(i);
  }


  submitHandler() {
    if (this.newRecipe.valid) {
      const rs = this.newRecipe.value;
      this.store.dispatch(new AddUserRecipe(rs)).toPromise().then(() => this.snackBar.open
      ('success', '', {duration: 600, panelClass: ['success']}))
        .catch(reason => {
          this.snackBar.open(reason, 'ok', {duration: 7000, panelClass: ['fail']});
        });
    }
    }
}
