import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { BlogService } from '../../../services/blog.service';
import { BlogModule } from '../../../moduls/blog.module';

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
  proccessing: Boolean = false;

  showPost: Boolean = false;
  showTitle: String = 'Title';
  showBody: String = 'Body';

  username: String;

  constructor(
    private formBuilder: FormBuilder,
    private blogService: BlogService,
    private auth: AuthService,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.auth.getProfile().subscribe(data => {
      if (data['success']) {
        this.username = data['user']['username'];
      }
    });
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

  enableForm() {
    this.form.get('file').enable();
    this.form.get('title').enable();
    this.form.get('body').enable();
  }

  disableForm() {
    this.form.get('file').disable();
    this.form.get('title').disable();
    this.form.get('body').disable();
  }

  onShowPost() {
    this.showPost = true;
    this.showTitle = this.form.controls['title'].value;
    this.showBody = this.form.controls['body'].value;
  }

  createPost() {
    this.proccessing = true;
    this.disableForm();
    const blog: BlogModule = {
      title: this.form.controls['title'].value,
      body: this.form.controls['body'].value,
      createdBy: this.username
    };
    this.blogService.newPost(blog).subscribe(data => {
      if (!data['success']) {
        this.enableForm();
        this.proccessing = false;
      } else {
        this.form.reset();
        this.enableForm();
        this.proccessing = false;
        this.uploadedText = 'Upload Image';
        this.fileState = '';
        this.router.navigate(['/posts']);
      }
    });
    this.showPost = false;
  }
}
