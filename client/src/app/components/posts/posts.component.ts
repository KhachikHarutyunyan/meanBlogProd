import { AuthService } from './../../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  messageClass: String;
  message: String;

  loader: Boolean = false;

  constructor(
    private spinner: NgxSpinnerService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loader = true;
    // this.spinner.show();
    // setTimeout(() => {
    //   this.loader = true;
    //   this.spinner.hide();
    // }, 2000);
  }

  reloadBlogs() {
    this.spinner.show();
    this.loader = false;
    setTimeout(() => {
      this.loader = true;
      this.spinner.hide();
    }, 2000);
  }

  onComments() {
    if (this.auth.loggedIn()) {
      this.router.navigate(['/']);
    } else {
      this.messageClass = 'alert alert-danger';
      this.message = 'You must be registered!';
    }
  }

}
