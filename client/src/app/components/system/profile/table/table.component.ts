import { NgxSpinnerService } from 'ngx-spinner';
import { BlogService } from './../../../../services/blog.service';
import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input('user') user;
  userInfo;
  about: String;
  ocupation: String;
  birthday: String;
  mobile: Number;
  location: String;
  myPostCount: Number = 0;

  date: Date;

  showTable: Boolean = true;
  loadPage: Boolean = true;

  constructor(
    private router: Router,
    private auth: AuthService,
    private spinner: NgxSpinnerService,
    private blogService: BlogService
  ) {
  }

  ngOnInit() {
    this.auth.getUserInfo(this.user).subscribe(data => {
      if (data['userInfo'] !== null) {
        if (data['success']) {
          this.userInfo = data['userInfo'];
          this.about = this.userInfo['about'];
          this.ocupation = this.userInfo['ocupation'];
          // tslint:disable-next-line:radix
          this.birthday = this.userInfo['birthday'];
          this.mobile = this.userInfo['mobile'];
          this.location = this.userInfo['location'];
          this.showTable = false;
          this.loadPage = false;
        } else {
          this.showTable = true;
        }
      } else {
        this.loadPage = false;
      }
    });
    this.getMyPosts(this.user);
  }



  getMyPosts(username) {
    this.blogService.getMyPosts(username).subscribe((data) => {
      this.myPostCount = data['posts'].length;
    });
  }

  myPosts() {
    this.router.navigate(['/system/my-posts']);
  }

}
