import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {UserRecipe} from "./Shared/userRecipe";
import {UserRecipeService} from "./Shared/user-recipe.service";

@Component({
  selector: 'app-user-recipes',
  templateUrl: './user-recipes.component.html',
  styleUrls: ['./user-recipes.component.css']
})
export class UserRecipesComponent implements OnInit {
userRecipes$: Observable<UserRecipe[]>;
userId: string = this.router.snapshot.params.toString();
  constructor(private router: ActivatedRoute, private userRecipesService: UserRecipeService) {
  }

  ngOnInit(): void {
 this.userRecipes$ = this.userRecipesService.getAllRecipesForUser(this.userId);
  }


  getUserId(){
    return this.router.snapshot.params;
  }

}
