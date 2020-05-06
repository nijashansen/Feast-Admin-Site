import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserGuard} from './guard/guard.guard';
import {RoleGuard} from './guard/role-guard';


const routes: Routes = [
  {
    path: 'recipes',
    loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule),
    canActivateChild: [UserGuard],

  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
    canActivateChild: [UserGuard],
    canLoad: [RoleGuard]
  },
  {
    path: 'userRecipes/:uid',
    loadChildren: () => import('./user-recipes/user-recipes.module').then(m => m.UserRecipesModule)
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
