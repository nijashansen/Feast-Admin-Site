import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {FormBuilder, FormGroup} from '@angular/forms';

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
              public auth: AuthenticationService,) {
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

    try {
      this.auth.signInWithEmailPassword(email, password);
      this.loginWithEmail = false;
    } catch (e) {
      console.log(e);
    }
  }

  signUpWithEmailPassword() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.auth.createUserWithEmailAndPassword(email, password);
  }

  loginWithEmailMethod() {
    this.loginWithEmail = !this.loginWithEmail;
  }
}
