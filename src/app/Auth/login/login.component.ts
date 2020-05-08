import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  loginForm: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private auth: AuthenticationService,
    public router: Router
  ) {
  }

  ngOnInit() {
  }

  signIn() {
    if (this.loginForm.valid) {
      this.auth.signInEmail(this.email, this.password).then(() => {
        this.router.navigate(['/home']);
      }).catch(reason => {});
    }
  }

  signInGoogle() {
    this.auth.signInGoogle();
    this.email = '';
    this.password = '';
  }

  signOut() {
    this.auth.signOut();
  }
}
