import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  sub1: Subscription;

  username: String;
  email: String;
  sex: String;
  avatar: Boolean;
  loader: Boolean = false;

  constructor(
    private auth: AuthService
  ) {
  }

  ngOnInit() {
    this.sub1 = this.auth.getProfile().subscribe(profile => {
      if (profile['success']) {
        this.username = profile['user']['username'];
        this.email = profile['user']['email'];
        this.sex = profile['user']['sex'];
        if (this.sex === 'male') {
          this.avatar = true;
        } else {
          this.avatar = false;
        }
        this.loader = false;
      } else {
        this.loader = true;
      }
    });
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }

}
