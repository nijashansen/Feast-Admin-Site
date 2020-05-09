import {Component, OnInit} from '@angular/core';

import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  passwordError = 'password';
  public signUpForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.pattern(/^[\w\s]+$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(public auth: AuthenticationService, public router: Router, private snackBar: MatSnackBar) {
    this.signUpForm.setControl('confirm_password', new FormControl('', [
      Validators.required,
      this.passwordConfirming(this.signUpForm.get('password'))
    ]));

  }

  ngOnInit() {
  }

  public onCancel() {
    console.log('cancel pressed');
    this.router.navigate(['/home']);
  }


  passwordConfirming(p: AbstractControl): ValidatorFn {
    return (currentControl: AbstractControl): { [key: string]: any } => {
      if (p.value !== currentControl.value) {
        const temp = {};
        temp[this.passwordError] = true;
        return temp;
      }
    };
  }

  public onSignUp() {
    if (this.signUpForm.valid) {
      this.auth.signUpEmail('', '')
        .then(() => {

        })
        .catch(() => {

        });
    }
  }
}
