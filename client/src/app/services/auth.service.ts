import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModule } from '../moduls/user.module';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() getUserName: EventEmitter<any> = new EventEmitter();

  domain = 'http://localhost:8000';
  token: String;
  user;
  authToken;
  options;

  constructor(
    private http: HttpClient,
    private jwtHelperService: JwtHelperService
  ) { }

  createAuthHeaders() {
    this.loadToken();
    this.options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': this.authToken
      })
    };
  }

  loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
  }

  registerUser(user: UserModule) {
    return this.http.post(this.domain + '/authentication/register', user);
  }

  checkUsername(username: String) {
    return this.http.get(this.domain + '/authentication/checkUsername/' + username);
  }

  checkEmail(email: String) {
    return this.http.get(this.domain + '/authentication/checkEmail/' + email);
  }

  login(user) {
    this.getUserName.emit(user.username);
    return this.http.post(this.domain + '/authentication/login', user);
  }

  logOut() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  storeUserData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.token = token;
    this.user = user;
  }

  getProfile(): Observable<Object> {
    this.createAuthHeaders();
    return this.http.get(this.domain + '/authentication/profile', this.options);
  }

  loggedIn() {
    const token: string = this.jwtHelperService.tokenGetter();
    if (!token) {
      return false;
    }
    const tokenExpired: boolean = this.jwtHelperService.isTokenExpired(token);
    return !tokenExpired;
  }

}
