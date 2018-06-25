declare const Pusher: any;
// import {Pusher} from '../../../node_modules/pusher-js/dist/web/pusher.min.js';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BlogModule } from '../moduls/blog.module';
import { environment } from '../../environments/environment';

// declare const Pusher: any;



@Injectable({
  providedIn: 'root'
})
export class BlogService {

  domain = this.auth.domain;
  options;

  pusher: any;
  channel: any;

  constructor(
    private auth: AuthService,
    private http: HttpClient
  ) {
    this.pusher = new Pusher(environment.pusher.key, {
      cluster: environment.pusher.cluster,
      encrypted: true
    });
    this.channel = this.pusher.subscribe('events-channel');
  }

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
