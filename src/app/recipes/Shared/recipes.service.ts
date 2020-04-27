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


  deleteRecipe(recipe: Recipe): Observable<Recipe> {
    return from(
      this.fs
        .doc(`Recipes/${recipe.id}`)
        .delete()
    ).pipe(
      map(() => {
        return recipe;
      })
    );
  }


  updateProduct(recipe: Recipe): Observable<Recipe> {
    return from( this.fs.doc(`Recipes/${recipe.id}`).update(recipe)).
    pipe( map(() => {
      return recipe; }
    ));

  }


}



