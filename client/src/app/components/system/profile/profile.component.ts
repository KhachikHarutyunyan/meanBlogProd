import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

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

  displayTable: Boolean = true;

  constructor(
    private auth: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.spinner.show();
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
        this.spinner.hide();
        this.loader = true;
      }
    });
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }

  goToAddMore() {
    this.displayTable = false;
    this.router.navigate(['/system/profile/add-more']);
  }

}
