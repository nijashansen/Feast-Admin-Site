import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UserRecipe} from './Shared/userRecipe';
import {UserRecipeService} from './Shared/user-recipe.service';

@Component({
  selector: 'app-user-recipes',
  templateUrl: './user-recipes.component.html',
  styleUrls: ['./user-recipes.component.css']
})
export class UserRecipesComponent implements OnInit {
  userRecipes$: Observable<UserRecipe[]>;
  userId: string = this.activatedRoute.snapshot.params.uid;
  isAddComponentActive: boolean;

  constructor(private activatedRoute: ActivatedRoute, private userRecipesService: UserRecipeService, public router: Router) {
    this.isAddComponentActive = false;
  }

  ngOnInit(): void {
    this.userRecipes$ = this.userRecipesService.getAllRecipesForUser(this.userId);
    this.userRecipes$.subscribe(value => console.log(value));
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
