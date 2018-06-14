import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  dropdown: Boolean = false;
  username: String;
  sex: String;
  avatar: Boolean = false;

  constructor(
    public auth: AuthService,
    private router: Router
  ) {

  }

  ngOnInit() {
      this.getUser();

  }

  changeName(name) {
    this.username = name;
  }

  onLogout() {
    this.auth.logOut();
    this.router.navigate(['/']);
    this.username = '';
    this.sex = '';
  }

  getUser() {
    if (this.auth.loggedIn()) {
      this.auth.getProfile().subscribe(profile => {
        if (profile['success']) {
          this.username = profile['user']['username'];
          this.sex = profile['user']['sex'];

          if (this.sex === 'male') {
            this.avatar = true;
          } else {
            this.avatar = false;
          }
        }

      });
    }
  }

}
