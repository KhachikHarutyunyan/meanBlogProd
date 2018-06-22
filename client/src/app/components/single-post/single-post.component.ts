import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogModule } from '../../moduls/blog.module';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  currentUrl: Object = { id: String };
  singlePost: BlogModule[] = [];
  username: String;
  processing: Boolean = false;
  modalClass: String;
  display: String = 'none';

  messageClass: String;
  message: String;

  constructor(
    public auth: AuthService,
    private blogService: BlogService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private activatedRouter: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.currentUrl = this.activatedRouter.snapshot.params;
    this.spinner.show();
    if (this.auth.loggedIn()) {
      this.auth.getProfile().subscribe(profile => {
        this.username = profile['user'].username;
      });
    }
    this.getSinglePost(this.currentUrl['id']);
  }

  getSinglePost(postUrl) {
    this.auth.getSinglePost(postUrl).subscribe((data: BlogModule[]) => {
      this.singlePost.push(data['blog']);
      this.processing = true;
      this.spinner.hide();
    });
  }

  showModal() {
    this.modalClass = 'md-show';
  }
  closeModal() {
    this.modalClass = '';
  }

  deletePost() {
    this.blogService.deletePost(this.currentUrl['id']).subscribe((data) => {
      if (!data['success']) {
        this.messageClass = 'alert alert-danger';
        this.message = data['message'];
        this.modalClass = '';
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data['message'];
        this.modalClass = '';
        setTimeout(() => {
          this.router.navigate(['/posts']);
        }, 1200);
      }
    });
  }

}
