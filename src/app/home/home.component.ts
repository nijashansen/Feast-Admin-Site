import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public loginWithEmail: boolean;

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              public auth: AuthenticationService,
              private snackBar: MatSnackBar) {
    this.loginWithEmail = false;
    auth.authUser$.subscribe(value => console.log(value));

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: '',
      password: ''
    });
  }

  goToRecipes() {
    this.router.navigate(['recipes']);
  }

  goToUsers() {
    this.router.navigate(['users']);
  }

  goToUserRecipes() {
    this.router.navigate(['userRecipes']);
  }

  loginWithGoogle() {
    this.auth.singInWithGoogle();
  }

  logout() {
    this.loginWithEmail = false;
    this.auth.signOut();
  }

  loginWithEmailPassword() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;


    this.auth.signInWithEmailPassword(email, password)
      .then(() =>
        this.snackBar.open('success', '', {duration: 600, panelClass: ['success']})).
           catch(reason => {
                this.snackBar.open(reason, 'ok', {duration: 6000, panelClass: ['fail']});

  });
    this.loginWithEmail = false;
  }

  signUpWithEmailPassword() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.auth.createUserWithEmailAndPassword(email, password).
    then(() => this.snackBar.open('success', '', {duration: 600, panelClass: ['success']})).
    catch(reason => { this.snackBar.open(reason, 'ok', {duration: 6000, panelClass: ['fail']});

   });
  }



  loginWithEmailMethod() {
    this.loginWithEmail = !this.loginWithEmail;
  }
}
