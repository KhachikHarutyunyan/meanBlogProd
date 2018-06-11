import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ClickOutsideDirective } from '../../click-outside.directive';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck {

  username: String;
  sex: String;

  constructor(
    public auth: AuthService,
    private router: Router
  ) {

  }

  ngOnInit() {
  }

  ngDoCheck() {
    if (this.auth.loggedIn()) {
      this.getUser();
    }
  }

  onLogout() {
    this.auth.logOut();
    this.router.navigate(['/']);
  }

  getUser() {
    if (this.auth.loggedIn()) {
      this.auth.getProfile().subscribe(profile => {
        this.username = profile['user']['username'];
        this.sex = profile['user']['sex'];
      });
    }
  }

}
