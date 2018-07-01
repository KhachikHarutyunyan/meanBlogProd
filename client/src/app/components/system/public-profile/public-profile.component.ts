import { BlogService } from './../../../services/blog.service';
import { BlogModule } from './../../../moduls/blog.module';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css']
})
export class PublicProfileComponent implements OnInit, OnDestroy {

  sub1: Subscription;

  username: String;
  email: String;
  sex: String;
  avatar: Boolean;
  loader: Boolean = false;
  currentUrl: Object;
  userInfo: Array<any> = [];
  userPosts: BlogModule;
  likedTitle: String = '';
  showTable: Boolean = false;
  noPosts: Boolean = false;

  constructor(
    private auth: AuthService,
    private blogService: BlogService,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.sub1 = this.auth.getPublicProfile(this.currentUrl['username']).subscribe(profile => {
      if (profile['success']) {
        this.username = profile['user']['username'];
        this.email = profile['user']['email'];
        this.sex = profile['user']['sex'];
        if (this.sex === 'male') {
          this.avatar = true;
        } else {
          this.avatar = false;
        }
        this.spinner.hide();
        this.loader = true;
      }
    });
    this.getUserInfo(this.currentUrl['username']);
    this.getUserPosts(this.currentUrl['username']);
  }

  getUserInfo(username) {
    this.auth.getUserInfo(username).subscribe(data => {
      console.log(data);
      if (data['userInfo'] !== null) {
        if (data['success']) {
          this.userInfo = data['userInfo'];
          console.log(this.userInfo);
        } else {
          this.showTable = true;
        }
      } else {
        // this.loadPage = false;
        this.showTable = true;
      }
    });
  }

  getUserPosts(user) {
    this.blogService.getMyPosts(user).subscribe(data => {
      this.userPosts = data['posts'];
      console.log(this.userPosts);
    });
  }

  likePost(id, creator, likedBy) {
      if (likedBy.indexOf(this.username) > -1) {
        this.likedTitle = 'You can like post only ones';
      } else {
        this.getUserPosts(this.currentUrl['username']);
        this.blogService.likePost(id).subscribe(data => {
          this.getUserPosts(this.currentUrl['username']);
        });
      }

  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }

}
