import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {from, Observable} from 'rxjs';
import {Recipe} from './recipe';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private fs: AngularFirestore) { }

  getAllRecipes(): Observable<Recipe[]> {
    return this.fs.collection<Recipe>('Recipes').snapshotChanges().pipe(map(stuf => {
      const newArry: Recipe[] = [];
      stuf.forEach(doc => {
        const recipe = doc.payload.doc.data();
        newArry.push({
          name: recipe.name,
          estimatedTime: recipe.estimatedTime,
          ingredients: recipe.ingredients
        });
      });
      return newArry;
    }));
  }


  addProduct(recipe: Recipe): Observable<Recipe> {
    return from(
      this.fs
        .collection('Recipes')
        .add(recipe)
    ).pipe(
      map(() => {
        return recipe;
      })
    );
  }
}
