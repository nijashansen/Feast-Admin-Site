import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {firebaseConfig} from '../environments/firebaseConfig';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {HomeModule} from './home/home.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {UserGuard} from './guard/guard.guard';
import {environment} from '../environments/environment';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {NgxsModule} from '@ngxs/store';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {RecipesState} from './recipes/Shared/recipes.state';
import {UserState} from './users/shared/user.state';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {MatIconModule} from '@angular/material/icon';
import {RoleGuard} from './guard/role-guard';
import { SankBarComponent } from './home/snak-bar/sank-bar.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SankBarComponent,
  ],
  imports: [
    MatSnackBarModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    HomeModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([RecipesState, UserState]
      , {developmentMode: !environment.production}),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    MatIconModule,

  ],
  entryComponents: [SankBarComponent],
  providers: [UserGuard, RoleGuard],
  bootstrap: [AppComponent]

})
export class AppModule {
}
