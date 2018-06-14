import { AuthGuardService } from './../../../services/auth-guard.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { LoginModule } from '../../../moduls/login.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  processing: Boolean = false;
  message: String;
  messageClass: String;
  previousUrl: String;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private authGuard: AuthGuardService
  ) {
    this.createForm();
  }

  ngOnInit() {
    if (this.authGuard.redirectUrl) {
      this.messageClass = 'alert alert-danger';
      this.message = 'You must be logged in to view that page';
      this.previousUrl = this.authGuard.redirectUrl;
      this.authGuard.redirectUrl = undefined;
    }
  }

  createForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  disableForm() {
    this.form.controls['username'].disable();
    this.form.controls['password'].disable();
  }

  enableForm() {
    this.form.controls['username'].enable();
    this.form.controls['password'].enable();
  }

  login() {
    this.processing = true;
    this.disableForm();
    const user: LoginModule = {
      username: this.form.get('username').value,
      password: this.form.get('password').value
    };
    this.auth.login(user).subscribe(data => {
      if (!data['success']) {
        this.messageClass = 'alert alert-danger';
        this.message = data['message'];
        this.processing = false;
        this.enableForm();
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data['message'];
        this.auth.storeUserData(data['token'], data['user']);
        setTimeout(() => {
          if (this.previousUrl) {
            this.router.navigate([this.previousUrl]);
          } else {
            this.router.navigate(['system/profile']);
          }
        }, 800);
      }
    });
  }

}
