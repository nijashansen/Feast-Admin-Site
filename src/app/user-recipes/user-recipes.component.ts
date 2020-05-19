import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UserRecipeState} from './Shared/userRecipe.state';
import {UserRecipe} from './Shared/userRecipe';
import {Select, Store} from '@ngxs/store';
import {GetAllRecipesForUser} from './Shared/userRecipes.action';
import {UserRecipeService} from "./Shared/user-recipe.service";


@Component({
  selector: 'app-user-recipes',
  templateUrl: './user-recipes.component.html',
  styleUrls: ['./user-recipes.component.css']
})
export class UserRecipesComponent implements OnInit {


  @Select(UserRecipeState.UserRecipes)
  userRecipes$: Observable<UserRecipe[]>;


  userId: string = this.activatedRoute.snapshot.params.uid;
  isAddComponentActive: boolean;


  constructor(private activatedRoute: ActivatedRoute, public router: Router, private userRecipesService: UserRecipeService, private store: Store) {
    this.isAddComponentActive = false;
  }

  ngOnInit(): void {
    this.store.dispatch(new GetAllRecipesForUser(this.getUserId()));

    // this.userRecipes$ = this.userRecipesService.getAllRecipesForUser(this.userId);
    // this.userRecipes$.subscribe(value => console.log(value));
  }


  getUserId() {
    return this.activatedRoute.snapshot.params.uid;
  }

  public createNew() {
    this.isAddComponentActive = true;

  }

  public onCancel() {
    this.isAddComponentActive = false;
  }
}
