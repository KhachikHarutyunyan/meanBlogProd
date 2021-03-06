import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogModule } from '../../moduls/blog.module';
import { BlogService } from '../../services/blog.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  currentUrl: Object = { id: String };
  singlePost: BlogModule[] = [];
  username: String;
  processing: Boolean = false;
  modalClass: String;
  display: String = 'none';
  likeCount: any;
  likedTitle: String = 'Like post';

  comments: Array<String> = [];
  showForm: Boolean = false;
  showBtn: Boolean = true;

  checkClass: String = 'user-comment';

  messageClass: String;
  message: String;

  guestModalClass: String;
  guestModalTitle: String;
  guestModalMessage: String;

  commentForm: FormGroup;

  newComment = [];

  pusherLike: any = 0;
  pusherLikedBy: any;

  userSex: String;
  avatar: Boolean;

  postComments: Array<any> = [];

  constructor(
    public auth: AuthService,
    private blogService: BlogService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private activatedRouter: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.createCommentForm();
  }

  ngOnInit() {
    this.currentUrl = this.activatedRouter.snapshot.params;
    this.spinner.show();
    if (this.auth.loggedIn()) {
      this.auth.getProfile().subscribe(profile => {
        if (profile['success']) {
          this.username = profile['user'].username;
          this.userSex = profile['user']['sex'];
          if (this.userSex === 'male') {
            this.avatar = true;
          } else {
            this.avatar = false;
          }
        }
      });
    }


    this.blogService.channel.bind('new-like', data => {
      this.pusherLike = data.likes;
      this.pusherLikedBy = data.likedBy;
    });

    this.blogService.getNewComment().subscribe(comment => {
      this.newComment.push(comment);
    });

    this.getSinglePost(this.currentUrl['id']);
  }

  getSinglePost(postUrl) {
    this.auth.getSinglePost(postUrl).subscribe((data: BlogModule[]) => {
      if (data['success']) {
        this.singlePost.push(data['blog']);
        if (this.singlePost['0']['comments'].length > 0) {
          this.postComments = this.singlePost[0]['comments'];
        }
        this.processing = true;
        this.spinner.hide();
        this.pusherLike = this.singlePost[0]['likes'];
        this.pusherLikedBy = this.singlePost[0]['likedBy'];
      }

    });
  }

  createCommentForm() {
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(200)
      ])]
    });
  }

  showModal() {
    this.modalClass = 'md-show';
  }
  closeModal() {
    this.modalClass = '';
  }

  closeGuestModal() {
    this.guestModalClass = '';
  }

  showGuestModal(title, body) {
    if (!this.auth.loggedIn()) {
      this.guestModalTitle = title;
      this.guestModalMessage = body;
      this.guestModalClass = 'md-show';
    }
  }

  guestOnAuthor() {
    const title = 'You must logged in';
    const body = 'Only logged in users can see other users information';
    this.showGuestModal(title, body);
  }

  deletePost() {
    this.blogService.deletePost(this.currentUrl['id']).subscribe((data) => {
      if (!data['success']) {
        this.messageClass = 'alert alert-danger';
        this.message = data['message'];
        this.modalClass = '';
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data['message'];
        this.modalClass = '';
        setTimeout(() => {
          this.router.navigate(['/posts']);
        }, 1200);
      }
    });
  }

  likedUser(id) {
    const likedBy = this.singlePost[0]['likedBy'];
    if (this.auth.loggedIn() && (this.username !== this.singlePost[0]['createdBy'])) {

      if (likedBy.indexOf(this.username) > -1) {
        this.likedTitle = 'You can like post only ones';
      } else {
        likedBy.push(this.username);
        this.pusherLikedBy.push(this.username);
        this.pusherLike = this.pusherLikedBy.length;
        this.blogService.likePost(id).subscribe(data => {
        });
      }
    } else {
      const title = 'You must logged in';
      const body = 'Only logged in users can like a post';
      this.showGuestModal(title, body);
    }
  }

  postComment() {
    const id = this.singlePost[0]['_id'];
    const comment = this.commentForm.get('comment').value;
    const commentInfo = {
      username: this.username,
      comment: comment,
      sex: this.userSex
    };
    this.blogService.sendComment(commentInfo);
    this.blogService.postComment(id, comment).subscribe(data => {
      // this.showForm = true;
      this.commentForm.reset();
    });
    this.showBtn = false;
  }

  goPublicProfile(user) {
    if (this.auth.loggedIn()) {
      if ((this.username !== user)) {
        this.router.navigate(['/system/public-profile/', user]);
      } else {
        this.router.navigate(['/system/profile']);
      }
    } else {
      this.guestOnAuthor();
    }

  }

}
