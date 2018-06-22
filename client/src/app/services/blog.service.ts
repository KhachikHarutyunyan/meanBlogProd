import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BlogModule } from '../moduls/blog.module';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  domain = this.auth.domain;
  options;

  constructor(
    private auth: AuthService,
    private http: HttpClient
  ) { }

  createAuthHeaders() {
    this.auth.loadToken();
    this.options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': this.auth.authToken
      })
    };
  }

  newPost(blog: BlogModule) {
    this.createAuthHeaders();
    return this.http.post(this.domain + '/blogs/newPost', blog, this.options);
  }

  getAllBlogs() {
    // podkluchaem iz 'authentication/allBlogs' chtob@ post@ b@li poluchen@ vne zavisimosti ot avtorizacii
    return this.http.get(this.domain + '/authentication/allBlogs');
  }

  editPost(post) {
    this.createAuthHeaders();
    return this.http.put(this.domain + '/blogs/updatePost/', post, this.options);
  }

  deletePost(id: String) {
    this.createAuthHeaders();
    return this.http.delete(this.domain + '/blogs/deletePost/' + id, this.options);
  }

  likePost(id: String) {
    const postData = { id: id };
    this.createAuthHeaders();
    return this.http.put(this.domain + '/blogs/likePost/', postData, this.options);
  }


}
