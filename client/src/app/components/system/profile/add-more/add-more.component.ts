import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IMyDpOptions } from 'mydatepicker';


@Component({
  selector: 'app-add-more',
  templateUrl: './add-more.component.html',
  styleUrls: ['./add-more.component.css']
})
export class AddMoreComponent implements OnInit {

  form: FormGroup;

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd.mm.yyyy',
    showTodayBtn: false
  };

  constructor(
    private formBuilder: FormBuilder
  ) { this.createForm(); }

  ngOnInit() {
    // this.form.controls['about'].setValue('ssasasassasasas');
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
    console.log(this.form);
    // console.log(this.form.value.myDate.formatted);
  }
}
