import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserGuard} from './guard/guard.guard';
import {RoleGuard} from './guard/role-guard';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';


const routes: Routes = [

  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'h',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'recipes',
    loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule),
    canActivateChild: [UserGuard],

  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
    canActivateChild: [UserGuard],
    canLoad: [RoleGuard]
  },
  {
    path: 'user-recipe',
    loadChildren: () => import('./user-recipes/user-recipes.module').then(m => m.UserRecipesModule)
  },
  {
    path: '',
    loadChildren: () => import('./Auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
