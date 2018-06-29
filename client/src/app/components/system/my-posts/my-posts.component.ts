import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../services/blog.service';
import { AuthService } from '../../../services/auth.service';
import { BlogModule } from '../../../moduls/blog.module';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {

  username: String;
  myPosts: BlogModule[] = [];
  modalClass: String;
  deletedId: String;
  showPosts: Boolean = true;

  constructor(
    private blogService: BlogService,
    private auth: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.auth.getProfile().subscribe(data => {
      if (data['success']) {
        this.username = data['user']['username'];
      } else {

      }

      this.getMyPosts(this.username);

    });
  }

  getMyPosts(username) {
    this.blogService.getMyPosts(username).subscribe((data) => {
      this.myPosts = data['posts'];
      this.showPosts = false;
      this.spinner.hide();
    });
  }

  postLikes(user) {
    this.router.navigate(['/system/public-profile/', user]);
  }

  showModal(id) {
    this.deletedId = id;
    this.modalClass = 'md-show';
  }

  deletePost() {
    this.blogService.deletePost(this.deletedId).subscribe(data => {
      this.modalClass = '';
      this.getMyPosts(this.username);
    });
  }

  closeModal() {
    this.modalClass = '';
  }

}
