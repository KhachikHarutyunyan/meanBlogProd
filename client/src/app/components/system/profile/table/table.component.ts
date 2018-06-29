import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {


  @Input('user') user: String;

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
    console.log( 'table user', this.user);
    // this.auth.getUserInfo(username).subscribe(data => {
    //   console.log(data);
    // });
  }

  myPosts() {
    this.router.navigate(['/system/my-posts']);
  }

}
