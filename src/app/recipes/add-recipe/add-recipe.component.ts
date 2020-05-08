import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from '../Shared/recipe';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Store} from '@ngxs/store';
import {CreateRecipe} from '../Shared/recipe.action';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
  @Output() cancel: EventEmitter<Event> = new EventEmitter<Event>();

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.min(1)]),
    estimatedTime: new FormControl('', [Validators.required]),
    ingredients: new FormArray([], [Validators.required]),
  });


  success = false;

  constructor(private store: Store, private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
  }

  addIngredient() {
    const ingredient = new FormGroup({
      name: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required, Validators.min(1)])
    });
    this.ingredients.push(ingredient);
  }

  ngOnInit(): void {
  }

  onCancel() {
    this.cancel.emit();
  }

  get ingredients() {
    return this.form.get('ingredients') as FormArray;
  }

  get name() {
    return this.form.get('name') as FormControl;
  }

  get estimatedTime() {
    return this.form.get('estimatedTime') as FormControl;
  }



  deleteIngredient(i) {
    this.ingredients.removeAt(i);
  }


  async submitHandler() {


    if (this.form.valid) {
      const rs = this.form.value;
      this.store.dispatch(new CreateRecipe(rs)).toPromise().then(() => this.snackBar.open
      ('success', '', {duration: 600, panelClass: ['success']}))
        .catch(reason => {
          this.snackBar.open(reason, 'ok', {duration: 7000, panelClass: ['fail']});
        });
    }
  }

}
