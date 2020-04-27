import {Ingredient} from '../../ingredient/ingredient';

export interface Recipe {
  id?: string;
  name: string;
  ingredients: Array<Ingredient>;
  estimatedTime: number;
}
