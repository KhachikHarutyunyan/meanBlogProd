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

  modal: Boolean = false;
  modalClass: String = '';

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

  onComments() {
  }

}
