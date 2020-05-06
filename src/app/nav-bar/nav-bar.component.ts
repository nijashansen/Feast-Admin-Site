import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {AuthUser} from '../users/shared/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {
  authState: AuthUser;

  constructor(public auth: AuthenticationService, public router: Router) {
  }

  ngOnInit(): void {
    this.auth.authUser$.subscribe(value => {
      this.authState = value;
    });
  }

}
