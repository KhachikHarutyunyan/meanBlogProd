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
  }

  createForm() {
    this.form = this.formBuilder.group({
      about: ['', Validators.compose([
        Validators.maxLength(200),
        Validators.minLength(5)
      ])],
      ocupation: ['', Validators.compose([
        Validators.maxLength(50),
        Validators.minLength(3)
      ])],
      location: ['', Validators.compose([
        Validators.maxLength(50),
        Validators.minLength(3)
      ])],
      myDate: [ null, Validators.compose([
        Validators.maxLength(50),
        Validators.minLength(3)
      ])],
      mobile: ['', Validators.compose([
        Validators.maxLength(50),
        Validators.minLength(3)
      ])],
    });
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

}
