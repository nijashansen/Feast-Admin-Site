import {UserRecipe} from '../../user-recipes/Shared/userRecipe';

export interface AuthUser {
  uid?: string;
  email: string;
  name?: string;
  userRecipes?: UserRecipe[];
  role?: string;

}
