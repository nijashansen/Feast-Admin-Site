import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  public isWrongPass: Observable<boolean>;

  constructor(
    private auth: AuthenticationService,
    public router: Router,
    private snackBar: MatSnackBar
  ) {
    this.isWrongPass = of(false);
  }

  ngOnInit() {
  }

  signIn() {
    if (this.loginForm.valid) {
      this.auth.signInEmail(this.loginForm.value.email, this.loginForm.value.password)
        .then(() => {
          this.snackBar.open('Welcome', '',
            {
              duration: 3000,
              panelClass: ['success']
            });
          this.router.navigate(['/home']);
        })
        .catch(reason => {
          console.log(reason);
          if (reason.code === 'auth/user-not-found') {
            this.snackBar.open('User does not Exist', '',
              {
                duration: 6000,
                panelClass: ['fail']
              });
          } else { //todo wrong password case
            this.snackBar.open(reason, '',
              {
                duration: 3000,
                panelClass: ['fail']
              });
          }
          this.isWrongPass = of(false);
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
