import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  redirectUrl;

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  canActivate(
    router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.auth.loggedIn()) {
      return true;
    } else {
      this.redirectUrl = state.url;
      this.router.navigate(['login']);
      return false;
    }
  }
}
