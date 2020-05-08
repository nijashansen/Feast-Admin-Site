import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

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
    public router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
  }

  signIn() {
    if (this.loginForm.valid) {
      this.auth.signInEmail(this.email, this.password)
        .then(() => {
          this.snackBar.open('Welcome', '',
            {
              duration: 3000,
              panelClass: ['success']
            });
          this.router.navigate(['/home']);
        })
        .catch(reason => {
          this.snackBar.open(reason, '',
            {
              duration: 3000,
              panelClass: ['fail']
            });
        });
    }
  }

  signInGoogle() {
    this.auth.signInGoogle()
      .then(() => {
        this.snackBar.open('Welcome', '',
          {
            duration: 3000,
            panelClass: ['success']
          });
        this.router.navigate(['/home']);
      })
      .catch(reason => {
        this.snackBar.open(reason, 'ok',
          {
            duration: 3000,
            panelClass: ['fail']
          });

      });
  }
}
