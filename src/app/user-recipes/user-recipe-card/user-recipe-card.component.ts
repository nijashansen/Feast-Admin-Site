import {Component, Input, OnInit} from '@angular/core';
import {UserRecipe} from '../Shared/userRecipe';

@Component({
  selector: 'app-user-recipe-card',
  templateUrl: './user-recipe-card.component.html',
  styleUrls: ['./user-recipe-card.component.css']
})
export class UserRecipeCardComponent implements OnInit {

  @Input() UserRecipe: UserRecipe
  active: boolean
  constructor() {
    this.active = false;
  }

  ngOnInit(): void {
  }

  public switchActivation() {
    this.active = !this.active;
  }
}
