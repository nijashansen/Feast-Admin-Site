import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngxs/store';
import {AddUserRecipe} from '../Shared/userRecipes.action';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserRecipe} from '../Shared/userRecipe';

@Component({
  selector: 'app-add-user-recipe',
  templateUrl: './add-user-recipe.component.html',
  styleUrls: ['./add-user-recipe.component.css']
})
export class AddUserRecipeComponent implements OnInit {

  @Input() ownerID: string;
  @Output() cancel: EventEmitter<Event> = new EventEmitter<Event>();

  newRecipe: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store, private snackBar: MatSnackBar) {
    this.newRecipe = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      estimatedTime: new FormControl('', [Validators.required]),
      userId: new FormControl(this.ownerID, [Validators.required]),
      ingredients: new FormArray([], [Validators.required]),
    });
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
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
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
    this.newRecipe.patchValue({userId: this.ownerID});
    if (this.newRecipe.valid) {
      const rs = this.newRecipe.value as UserRecipe;
      this.store.dispatch(new AddUserRecipe(rs)).toPromise().then(() => {
        this.snackBar.open
        ('success', '', {duration: 600, panelClass: ['success']});
        this.onCancel();
      })
        .catch(reason => {
          this.snackBar.open(reason, 'ok', {duration: 7000, panelClass: ['fail']});
        });
    }
  }
}
