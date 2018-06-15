import { NotAuthService } from './services/not-auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PostsComponent } from './components/posts/posts.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AuthService } from './services/auth.service';
import { SystemComponent } from './components/system/system.component';
import { ProfileComponent } from './components/system/profile/profile.component';
import { JwtModule } from '@auth0/angular-jwt';
import { DropdownComponent } from './components/navbar/dropdown/dropdown.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AddMoreComponent } from './components/system/profile/add-more/add-more.component';
import { TableComponent } from './components/system/profile/table/table.component';
import { MyDatePickerModule } from 'mydatepicker';
import { AuthGuardService } from './services/auth-guard.service';
import { NewPostComponent } from './components/system/new-post/new-post.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    PostsComponent,
    LoginComponent,
    RegisterComponent,
    SystemComponent,
    ProfileComponent,
    DropdownComponent,
    AddMoreComponent,
    TableComponent,
    NewPostComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MyDatePickerModule,
    NgxSpinnerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
        whitelistedDomains: ['http://localhost:8000']
      }
    })
  ],
  providers: [AuthService, AuthGuardService, NotAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
