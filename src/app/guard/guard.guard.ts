import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';
import {AuthUser} from '../users/shared/user';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate, CanActivateChild {
  authUser$: Observable<AuthUser>;

  constructor(private router: Router, private authService: AuthenticationService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.authUser$.pipe(map(user => {
      if (user === undefined) {
        this.router.navigate(['/']);
        return false;
      }
      return user !== undefined;
    }));

  }

  // tslint:disable-next-line:max-line-length
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.authUser$.pipe(map(user => {
      if (user === undefined) {
        this.router.navigate(['/']);
        return false;
      }
      return user !== undefined;
    }));
  }

}
