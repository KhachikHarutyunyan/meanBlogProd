import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../../services/blog.service';
import { AuthService } from '../../../services/auth.service';
import { BlogModule } from '../../../moduls/blog.module';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  currentUrl: Object = { id: String };
  post: BlogModule;
  loading: Boolean;
  messageClass: String;
  message: String;

  constructor(
    private activatedRoute: ActivatedRoute,
    private auth: AuthService,
    private blogService: BlogService,
    private location: Location,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.spinner.show();
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.auth.getSinglePost(this.currentUrl['id']).subscribe(data => {
      if (!data['success']) {
        console.log('error');
      } else {
        this.post = data['blog'];
        this.loading = false;
        this.spinner.hide();
      }
    });
  }

  goBack() {
    this.location.back();
  }

  editPost() {
    this.blogService.editPost(this.post).subscribe(data => {
      if (!data['success']) {
        this.messageClass = 'alert alert-danger';
        this.message = data['message'];
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data['message'];
        console.log('data', data);
        setTimeout(() => {
          this.router.navigate(['single-post/', this.currentUrl['id']]);
        }, 1000);
      }
    });
  }

}
