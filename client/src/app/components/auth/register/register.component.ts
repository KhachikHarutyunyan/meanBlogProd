import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { UserModule } from '../../../moduls/user.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  messageClass: String;
  message: String;
  processing: Boolean = false;
  emailMessage: String;
  emailValid: Boolean;
  usernameValid: Boolean;
  usernameMessage: String;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        this.usernameValidator
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(35),
        this.emailValidator
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
        this.passwordValidator
      ])],
      confirm: ['', Validators.compose([
        Validators.required,
      ])],
      radio: ['male', Validators.compose([
        Validators.required
      ])]
    }, { validator: this.matchingPass('password', 'confirm') });
  }

  disableForm() {
    this.form.controls['username'].disable();
    this.form.controls['email'].disable();
    this.form.controls['password'].disable();
    this.form.controls['confirm'].disable();
    this.form.controls['radio'].disable();
  }

  enableForm() {
    this.form.controls['username'].enable();
    this.form.controls['email'].enable();
    this.form.controls['password'].enable();
    this.form.controls['confirm'].enable();
    this.form.controls['radio'].enable();
  }

  usernameValidator(controls) {
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return {
        'usernameValidator': true
      };
    }
  }

  emailValidator(controls) {
    // tslint:disable-next-line:max-line-length
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return {
        'emailValidator': true
      };
    }
  }

  passwordValidator(controls) {
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return {
        'passwordValidator': true
      };
    }
  }

  matchingPass(password, confirm) {
    return (group: FormGroup) => {
      if (group.controls.password.value === group.controls.confirm.value) {
        return null;
      } else {
        return {
          'matchingPass': true
        };
      }
    };
  }

  register() {
    this.processing = true;
    this.disableForm();
    const user: UserModule = {
      username: this.form.get('username').value,
      email: this.form.get('email').value,
      password: this.form.get('password').value,
      sex: this.form.get('radio').value
    };
    this.auth.registerUser(user).subscribe(data => {
      if (!data['success']) {
        this.messageClass = 'alert alert-danger';
        this.message = data['message'];
        this.processing = false;
        this.enableForm();
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data['message'];
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 800);
      }
    });
  }

  checkEmail() {
    // const email = this.form.get('email').value;
    if (this.form.get('email').value) {
      this.auth.checkEmail(this.form.get('email').value).subscribe(data => {
        if (!data['success']) {
          this.emailValid = false;
          this.emailMessage = data['message'];
        } else {
          this.emailValid = true;
          this.emailMessage = data['message'];
        }
      });
    }
  }


  checkUsername() {
    // const email = this.form.get('email').value;
    if (this.form.get('username').value && this.form.get('username').value.length > 2) {
      this.auth.checkUsername(this.form.get('username').value).subscribe(data => {
        if (!data['success']) {
          this.usernameValid = false;
          this.usernameMessage = data['message'];
        } else {
          this.usernameValid = true;
          this.usernameMessage = data['message'];
        }
      });
    }
  }

}
