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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'system', component: SystemComponent, children: [
    { path: 'profile', component: ProfileComponent, children: [
      { path: '', component: TableComponent },
      { path: 'add-more', component: AddMoreComponent }
    ] }
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
