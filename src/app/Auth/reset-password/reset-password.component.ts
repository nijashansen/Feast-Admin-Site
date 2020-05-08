import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  email: string;
  resetSentFlag: boolean;

  constructor(public auth: AuthenticationService) {
    this.resetSentFlag = false;
  }

  ngOnInit() {
  }

  resetPassword() {
    this.auth.resetPasswordEmail(this.email).then(res => {
      this.resetSentFlag = true;
    }).catch(reason => {
      console.log('Ups: ' + reason);
    });
  }

}
