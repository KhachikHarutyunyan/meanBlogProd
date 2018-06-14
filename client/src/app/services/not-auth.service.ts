import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotAuthService {

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  canActivate(): boolean {
    if (this.auth.loggedIn()) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }

}
