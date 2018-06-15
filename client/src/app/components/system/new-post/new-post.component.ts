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
    reader.readAsDataURL(this.fileToUpload);

    this.uploadedText = 'File is uploaded';
    console.log(this.fileToUpload);
  }

  createForm() {
    this.form = this.formBuilder.group({
      file: '',
      title: ['', Validators.compose([
        Validators.required
      ])],
      body: ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  createPost() {
    console.log(this.form.controls.file.value);
  }

}
