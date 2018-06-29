import { NotAuthService } from './services/not-auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PostsComponent } from './components/posts/posts.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { SystemComponent } from './components/system/system.component';
import { ProfileComponent } from './components/system/profile/profile.component';
import { AddMoreComponent } from './components/system/profile/add-more/add-more.component';
import { TableComponent } from './components/system/profile/table/table.component';
import { NewPostComponent } from './components/system/new-post/new-post.component';
import { SinglePostComponent } from './components/single-post/single-post.component';
import { EditPostComponent } from './components/system/edit-post/edit-post.component';
import { PublicProfileComponent } from './components/system/public-profile/public-profile.component';
import { MyPostsComponent } from './components/system/my-posts/my-posts.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'login', component: LoginComponent, canActivate: [NotAuthService] },
  { path: 'register', component: RegisterComponent, canActivate: [NotAuthService] },
  { path: 'single-post/:id', component: SinglePostComponent },
  { path: 'system', component: SystemComponent, canActivate: [AuthGuardService], children: [
    { path: 'profile', component: ProfileComponent, children: [
      { path: '', component: TableComponent },
      { path: 'add-more', component: AddMoreComponent }
    ] },
    { path: 'new-post', component: NewPostComponent },
    { path: 'edit-post/:id', component: EditPostComponent },
    { path: 'public-profile/:username', component: PublicProfileComponent },
    { path: 'my-posts', component: MyPostsComponent }
   ] },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
