import { AuthService } from './../../../../services/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IMyDpOptions } from 'mydatepicker';
import { UserInfo } from '../../../../moduls/user-info.module';
import { Location } from '@angular/common';


@Component({
  selector: 'app-add-more',
  templateUrl: './add-more.component.html',
  styleUrls: ['./add-more.component.css']
})
export class AddMoreComponent implements OnInit {

  form: FormGroup;

  @Input() user;
  userInfo: Object;
  placeHolder: any;
  loadPage: Boolean = true;
  toggleSendBtns: Boolean = true;

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd.mm.yyyy',
    showTodayBtn: false
  };

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private location: Location,
  ) { this.createForm(); }

  ngOnInit() {
    this.auth.getUserInfo(this.user).subscribe(data => {
      if (data['userInfo'] !== null) {
        if (data['success']) {
          this.userInfo = data['userInfo'];
          this.placeHolder = this.userInfo['birthday'];

          this.form.setValue({
            about: this.userInfo['about'],
            ocupation: this.userInfo['ocupation'],
            myDate: this.userInfo['birthday'],
            mobile: this.userInfo['mobile'],
            location: this.userInfo['location'],
          });
          this.loadPage = false;
          this.toggleSendBtns = false;
        } else {
        }
      } else {
        this.loadPage = false;
      }
    });
  }

  createForm() {
    this.form = this.formBuilder.group({
      about: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(200)
      ])],
      ocupation: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ])],
      location: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(80),
        Validators.minLength(3)
      ])],
      myDate: [ null, Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ])],
      mobile: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(8),
        this.phoneValid
      ])],
    });
  }

  phoneValid(controls) {
    // tslint:disable-next-line:max-line-length
    const regExp = new RegExp(/^(1[ \-\+]{0,3}|\+1[ -\+]{0,3}|\+1|\+)?((\(\+?1-[2-9][0-9]{1,2}\))|(\(\+?[2-8][0-9][0-9]\))|(\(\+?[1-9][0-9]\))|(\(\+?[17]\))|(\([2-9][2-9]\))|([ \-\.]{0,3}[0-9]{2,4}))?([ \-\.][0-9])?([ \-\.]{0,3}[0-9]{2,4}){2,3}$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return {
        'phoneValid': true
      };
    }

  }

  setDate(): void {
    const date = new Date();
    this.form.patchValue({ myDate: {
      date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      }
    } });
  }

  clearDate(): void {
    this.form.patchValue({ myDate: null });
  }

  sendUserInfo() {
    const userInfo: UserInfo = {
      username: this.user,
      about: this.form.value.about,
      ocupation: this.form.value.ocupation,
      birthday: this.form.value.myDate.formatted,
      mobile: this.form.value.mobile,
      location: this.form.value.location
    };
    this.auth.postUserInfo(userInfo).subscribe(data => {
      if (data['success']) {
        this.toggleSendBtns = false;
      }
    });
    this.form.reset();
  }

  saveChanges() {
    let checkedBirthday;
    if (this.form.value.myDate.formatted === undefined) {
      checkedBirthday = this.userInfo['birthday'];
    } else {
      checkedBirthday = this.form.value.myDate.formatted;
    }

    const changedInfo: UserInfo = {
      username: this.user,
      about: this.form.value.about,
      ocupation: this.form.value.ocupation,
      birthday: checkedBirthday,
      mobile: this.form.value.mobile,
      location: this.form.value.location
    };
    this.auth.changeInfo(changedInfo).subscribe(data => {
    });
    this.form.reset();
  }

}
