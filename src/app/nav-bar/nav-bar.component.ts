import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {AuthUser} from '../users/shared/user';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {
  authState: AuthUser;

  constructor(public auth: AuthenticationService, public router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    const sub = this.auth.authUser$.subscribe(value => {
      this.authState = value;
      console.log('Bad');
    });
  }

  signOut() {
    this.auth.signOut().then(() => {
      this.snackBar.open('Good bye', '',
        {
          duration: 600,
          panelClass: ['success']
        });
      this.router.navigate(['/home']);
    })
      .catch(reason => {
        this.snackBar.open(reason, 'ok',
          {
            duration: 6000,
            panelClass: ['fail']
          });

      });
  }

}
