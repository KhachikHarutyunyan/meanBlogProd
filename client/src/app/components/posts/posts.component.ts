import { AuthService } from './../../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { BlogModule } from '../../moduls/blog.module';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  blogPosts: BlogModule;

  loader: Boolean = false;
  username: String;
  likeCount: any;
  doLike: Boolean = true;

  modal: Boolean = false;
  modalClass: String = '';
  likedTitle: String = 'Like post';
  likedId;

  guestModalClass: String;
  guestModalTitle: String;
  guestModalMessage: String;

  likedBy = [];

  constructor(
    private spinner: NgxSpinnerService,
    public auth: AuthService,
    private blogService: BlogService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loader = false;
    this.spinner.show();
    if (this.auth.loggedIn()) {
      this.auth.getProfile().subscribe(profile => {
        this.username = profile['user'].username;
      });
    }
    this.getAllBlogs();
  }

  getAllBlogs() {
    this.blogService.getAllBlogs().subscribe(blogs => {
      this.loader = true;
      this.spinner.hide();
      this.blogPosts = blogs['blogs'];
    });
  }

  reloadBlogs() {
    this.spinner.show();
    this.loader = false;
    this.getAllBlogs();
    setTimeout(() => {
      this.loader = true;
      this.spinner.hide();
    }, 2000);
  }

  likePost(id, creator, likedBy) {

    if (this.auth.loggedIn() && (this.username !== creator)) {
      if (likedBy.indexOf(this.username) > -1) {
        this.likedTitle = 'You can like post only ones';
      } else {
        this.getAllBlogs();
        this.doLike = false;
        this.blogService.likePost(id).subscribe(data => {
          this.getAllBlogs();
        });
      }
    } else {
      const title = 'You must logged in';
      const body = 'Only logged in users can like a post';
      this.showGuestModal(title, body);
    }

  }

  closeGuestModal() {
    this.guestModalClass = '';
  }

  showGuestModal(title, body) {
    if (!this.auth.loggedIn()) {
      this.guestModalTitle = title;
      this.guestModalMessage = body;
      this.guestModalClass = 'md-show';
    }
  }

  guestOnAuthor() {
    const title = 'You must logged in';
    const body = 'Only logged in users can see other users information';
    this.showGuestModal(title, body);
  }


}
