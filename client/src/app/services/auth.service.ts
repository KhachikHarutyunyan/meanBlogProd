import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModule } from '../moduls/user.module';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  domain = 'http://localhost:8000';

  constructor(
    private http: HttpClient
  ) { }

  registerUser(user: UserModule) {
    return this.http.post(this.domain + '/authentication/register', user);
  }

}
