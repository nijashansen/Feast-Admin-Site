import {Component, OnInit} from '@angular/core';

import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  email = '';
  pw1 = '';
  pw2 = '';

  constructor(public auth: AuthenticationService, public router: Router) {
  }

  ngOnInit() {
  }

  public onOk() {
    console.log('em: ' + this.email + ', pw1: ' + this.pw1 + ', pw2: ' + this.pw2);
    if (this.pw1 === this.pw2) {
      this.auth.signUpEmail(this.email, this.pw1);
      console.log('user created');
      this.router.navigate(['/home']);
    } else {
      console.log('password not the same');
    }
  }

  public onCancel() {
    console.log('cancel pressed');
    this.router.navigate(['']);
  }
}
