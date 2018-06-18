import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  form: FormGroup;

  imgUrl: String = '../../../../assets/img/default.jpg';
  fileToUpload: File = null;
  uploadedText: String = 'Upload Image';
  fileState: String;

  constructor(
    private formBuilder: FormBuilder,
    public auth: AuthService,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  uploadImg(file: FileList) {
    this.fileToUpload = file.item(0);
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imgUrl = event.target.result;
    };
    if (this.fileToUpload) {
      reader.readAsDataURL(this.fileToUpload);
      this.fileState = 'valid-file';
      this.uploadedText = 'File is uploaded';
      console.log(this.fileToUpload);
    } else {
      this.fileState = 'invalid-file';
      this.uploadedText = 'You must upload image!';
    }

  }

  createForm() {
    this.form = this.formBuilder.group({
      file: ['', Validators.required],
      title: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(5)
      ])],
      body: ['', Validators.compose([
        Validators.required,
        Validators.minLength(35),
        Validators.maxLength(1550)
      ])]
    });
  }

  createPost() {
    console.log(this.form);
  }

}
