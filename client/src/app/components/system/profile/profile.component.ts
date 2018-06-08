import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user;
  username: String;
  email: String;
  defoultAvatar: String;

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.auth.getProfile().subscribe(profile => {
      this.user = profile['user'];
      // this.username = profile['user']['username'];
      this.username = this.user['username'];
      this.email = this.user['email'];
      if (this.user.sex === 'male') {
        this.defoultAvatar = '../../../../assets/svg-tour/man.svg';
      } else {
        this.defoultAvatar = '../../../../assets/svg-tour/girl.svg';
      }
    });
  }

}
