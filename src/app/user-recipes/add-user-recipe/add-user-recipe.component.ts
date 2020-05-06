import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {UserRecipeService} from '../Shared/user-recipe.service';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-add-user-recipe',
  templateUrl: './add-user-recipe.component.html',
  styleUrls: ['./add-user-recipe.component.css']
})
export class AddUserRecipeComponent implements OnInit {

  @Input() ownerID: string;

  newRecipe = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    estimatedTime: new FormControl(''),
    ingredients: new FormArray([]),
  });

  constructor(private formBuilder: FormBuilder, private userRecipeService: UserRecipeService) {
  }

  get ingredients() {
    return this.newRecipe.get('ingredients') as FormArray;
  }

  ngOnInit(): void {
    this.newRecipe = this.formBuilder.group({
      name: '',
      estimatedTime: 0,
      userId: this.ownerID,
      ingredients: this.formBuilder.array([])
    });
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
    const rs = this.newRecipe.value;
    // @ts-ignore
    this.userRecipeService.addUserRecipe(rs).pipe(catchError(err => {
      console.log(err);
    }));

  }
}
