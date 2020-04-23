export interface Recipe {
  id?: string;
  name: string;
  ingredients: Array<string>;
  estimatedTime: number;
}
