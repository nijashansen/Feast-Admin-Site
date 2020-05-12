import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {UserRecipe} from './userRecipe';
import {from, Observable} from 'rxjs';
import {first, map} from 'rxjs/operators';

const ServicePart = 'UserRecipe';

@Injectable({
  providedIn: 'root'
})
export class UserRecipeService {

  constructor(private fs: AngularFirestore) {
  }

  /*
  getRecipeById(urID: string): Observable<UserRecipe> {
    return this.fs.collection<UserRecipe>(ServicePart).doc<UserRecipe>(urID).valueChanges().pipe(map(response => {
        console.log(2, response);
        const info = response as UserRecipe;
        info.id = urID;
        return info;
      }
    ));
  } // tjek

  getAllUserRecipes(): Observable<UserRecipe[]> {
    return this.fs.collection<UserRecipe>(ServicePart).snapshotChanges().pipe(map(response => {
      const newArray: UserRecipe[] = [];
      response.forEach(doc => {
        const ur = doc.payload.doc.data() as UserRecipe;
        ur.id = doc.payload.doc.id;
        newArray.push(ur);
      });
      return newArray;
    }));
  }

   */

  getAllRecipesForUser(userId: string): Observable<UserRecipe[]> {
    return this.fs.collection<UserRecipe>(ServicePart, ref => ref.where('userId', '==', userId))
      .snapshotChanges()
      .pipe(map(response => {
        const newArray: UserRecipe[] = [];
        response.forEach(doc => {
          const ur = doc.payload.doc.data() as UserRecipe;
          ur.id = doc.payload.doc.id;
          newArray.push(ur);
        });
        return newArray;
      }));
  }


  addUserRecipe(recipe: UserRecipe): Promise<any> {
    return this.fs.collection(ServicePart).add(recipe);
  }


  deleteUserRecipe(urId: string): Promise<any> {
    return this.fs.doc(`${ServicePart}/${urId}`).delete();
  }


  updateUserRecipe(recipe: UserRecipe): Promise<any> {
    return this.fs.doc(`${ServicePart}/${recipe.id}`).update(recipe);
  }

}
