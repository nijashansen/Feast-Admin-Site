import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";
import {Observable} from "rxjs";
import {User} from "firebase";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loginWithEmail: boolean = false;

  constructor(private router: Router, public auth: AuthenticationService) { }

  ngOnInit(): void {
  }

  goToRecipes() {
    this.router.navigate(['recipes']);
  }

  loginWithGoogle() {
    this.auth.singInWithGoogle()
  }

  logout() {
    this.loginWithEmail = false;
    this.auth.signOut();
  }

  loginWithEmailPassword(email: string, password: string) {
    this.loginWithEmail = true;
    this.auth.signInWithEmailPassword(email, password);
  }
}
