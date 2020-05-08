import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Recipe} from './Shared/recipe';
import {Router} from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {RecipesState} from './Shared/recipes.state';
import {GetAllRecipes} from './Shared/recipe.action';





@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})


export class RecipesComponent implements OnInit {
  @Select(RecipesState.recipes)
  recipes$: Observable<Recipe[]>;

  isAddComponentActive: boolean;

  constructor(public router: Router, private store: Store) {
    this.isAddComponentActive = false;
  }

  ngOnInit(): void {
    this.store.dispatch(new GetAllRecipes());
}



  public createNew() {
    this.isAddComponentActive = true;

  }

  public onCancel() {
    this.isAddComponentActive = false;
  }
}

