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

  constructor(
    private auth: AuthService,
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
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }

}
