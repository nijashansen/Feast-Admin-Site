import {Ingredient} from '../../ingredient/ingredient';

export class UserRecipe {
  id?: string;
  name: string;
  ingredients?: Array<Ingredient>;
  estimatedTime?: number;
  userId?: string;
}
