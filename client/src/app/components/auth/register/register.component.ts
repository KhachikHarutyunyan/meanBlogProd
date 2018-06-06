import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder
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

  usernameValidator(controls) {
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return {
        'usernameValid': true
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
        'emailValid': true
      };
    }
  }

  passwordValidator(controls) {
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return {
        'passwordValid': true
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
    console.log(this.form);
  }

}
