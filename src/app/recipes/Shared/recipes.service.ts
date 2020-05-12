import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Recipe} from './recipe';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private fs: AngularFirestore) {
  }

  getAllRecipes(): Observable<Recipe[]> {
    return this.fs.collection<Recipe>('Recipes').snapshotChanges().pipe(map(stuf => {
      const newArray: Recipe[] = [];
      stuf.forEach(doc => {
        const recipe = doc.payload.doc.data();
        const Fbid = doc.payload.doc.id;
        newArray.push({
          id: Fbid,
          name: recipe.name,
          estimatedTime: recipe.estimatedTime,
          ingredients: recipe.ingredients,
        });
      });
      return newArray;
    }));
  }


  addRecipe(recipe: Recipe): Promise<any> {
    return this.fs.collection('Recipes').add(recipe);
  }


  deleteRecipe(recipe: Recipe): Promise<any> {
    return this.fs.doc(`Recipes/${recipe.id}`).delete();
  }


  updateRecipe(recipe: Recipe): Promise<any> {
    return this.fs.doc(`Recipes/${recipe.id}`).update(recipe);
  }


}



