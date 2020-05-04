import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {UserRecipe} from "./userRecipe";
import {from, Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserRecipeService {

  constructor(private fs: AngularFirestore) { }

  getRecipeById(recipe: Map<string, string>): Observable<UserRecipe>{
    return this.fs.collection<UserRecipe>('UserRecipe').doc<UserRecipe>(`${recipe.keys()}`).snapshotChanges().pipe(map(changes => {
        const info = changes.payload.data as unknown as UserRecipe;
        const fId = changes.payload.id;
        info.id = fId;
        return info;

      }
    ));
  }


  getAllRecipesForUser(userId: string): Observable<UserRecipe[]>{
    // tslint:disable-next-line:max-line-length
    return this.fs.collection<UserRecipe>('UserRecipe', sel => sel.where('uid', '==', `UserRecipes/${userId}`)).snapshotChanges().pipe(map (doStuf => {
      const newArray: UserRecipe[] = [];
      doStuf.forEach(doc => {
        const recipe = doc.payload.doc.data();
        const fbId = doc.payload.doc.id;
        newArray.push({
          id: fbId,
          name: recipe.name,
          ingredients: recipe.ingredients,
          estimatedTime: recipe.estimatedTime,
          userId: recipe.userId
        });
      });
      return newArray;
    }));
  }


  addUserRecipe(recipe: UserRecipe): Observable<UserRecipe>{
    return from(this.fs.collection('UserRecipe')
      .add(recipe)).pipe(map(() => {
      return recipe;
    }));
  }


  deleteUserRecipe(recipe: UserRecipe): Observable<UserRecipe>{
    return from(
      this.fs
        .doc(`UserRecipes/${recipe.id}`)
        .delete()
    ).pipe(
      map(() => {
        return recipe;
      })
    );
  }


  updateUserRecipe(recipe: UserRecipe): Observable<UserRecipe>{
    return from(this.fs.doc(`UserRecipes/${recipe.id}`).update(recipe)).pipe(map(() => {
        return recipe;
      }
    ));
  }

}
