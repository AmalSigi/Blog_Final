import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { commentsApi } from 'src/app/core/http/comments.service';
import { postsAPi } from 'src/app/core/http/post.service';

@Component({
  selector: 'app-user-content',
  templateUrl: './user-content.component.html',
})
export class UserContentComponent implements OnInit {
  constructor(
    private readonly postApi: postsAPi,
    private readonly commentsApi: commentsApi,
    private readonly http: HttpClient,
    private fb: FormBuilder
  ) {}
  public post: any;
  public suggestionPost: any = [];
  public commentDiv: boolean = false;
  public replayInputBox: boolean = false;
  public viewRelpayComments: boolean = false;
  public parentCommentAuthor: string = 'comments';
  public parentId: any = null;
  public comments: any;
  public commentboxId: any;
  public replayCommentData: any = [];
  public totalCount = 0;

  // //  form.......
  // // form user
  public commentForm = new FormGroup({
    comment: new FormControl('', Validators.required),
    _ParentId: new FormControl(''),
  });
  // // form guest user
  public guestCommentForm = new FormGroup({
    comment: new FormControl('', Validators.required),
    __ParentId: new FormControl(''),
    _tempUser: this.fb.group({
      firstName: ['', Validators.required],
      _MiddleName: [''],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
    }),
  });

  ngOnInit(): void {
    this.getMainPost();
  }

  // // Post

  public postCall(postId: any) {
    return this.postApi.getPostById(postId);
  }

  public getMainPost() {
    this.postCall(10).subscribe((repo) => {
      console.log(repo);
      this.post = repo;
      this.getComments();
      this.getRecommendedPost();
    });
  }

  public getPost(post: any) {
    // console.log(post);
    this.postCall(post.postId).subscribe((repo) => {
      let heading = repo.postSections.filter(
        (item: any) => item.sectionTypeId == 1
      );
      let img = repo.postSections.filter(
        (item: any) => item.sectionTypeId == 4
      );

      let subHeading = repo.postSections.filter(
        (item: any) => item.sectionTypeId == 2
      );
      let obj = {
        postId: post.postId,
        heading: heading[0],
        subHeading: subHeading[0],
        img: img[0],
      };
      this.suggestionPost.push(obj);
      console.log(this.suggestionPost);
    });
  }

  // // comments
  public getComments() {
    this.commentsApi.getAllCommentsForBolg(this.post.id).subscribe((repo) => {
      this.comments = repo;
    });
  }

  // //reply comments
  public replyBox(comment: any) {
    this.replayInputBox = true;
    this.parentCommentAuthor = `@${comment.author.firstName}`;
    this.parentId = comment.id;
  }
  public sendReply() {
    if (1) {
      // // logged user send function
      this.commentForm.controls['_ParentId'].setValue(this.parentId);
      console.log(this.commentForm.value);
      // this.commentsApi
      //   .postComment(this.post.id, this.commentForm.value)
      //   .subscribe((_repo) => {
      //     this.commentForm.reset()
      //   });
    } else {
      // // guest user send function
      this.guestCommentForm.controls['__ParentId'].setValue(this.parentId);
      console.log(this.guestCommentForm.value);

      // this.commentsApi
      //   .postGuestUserComment(this.post.id, this.guestCommentForm.value)
      //   .subscribe((repo) => {
      //     this.guestCommentForm.reset();
      //   });
    }
  }

  // // view replyComment

  public viewReplyBox(id: any, comment: any) {
    if (this.commentboxId == id) {
      this.viewRelpayComments = false;
      this.replayInputBox = false;
      this.commentboxId = -1;
    } else {
      this.viewRelpayComments = true;
      this.commentboxId = id;
      this.replyComment(comment);
    }
  }

  public replyComment(childComment: any) {
    this.replayCommentData = [];
    for (let comment of childComment) {
      if (comment.parentId != null) {
        this.parentIdFinder(comment.parentId, comment);
      }
    }
  }
  public parentIdFinder(parentId: any, comment: any) {
    this.commentsApi.getSingleComment(parentId).subscribe((repo: any) => {
      comment.parentAuthor = repo.author.firstName;
      this.replayCommentData.push(comment);
    });
  }
  // // Recommended
  public getRecommendedPost() {
    this.postApi.getRecommendedPost(this.post.id).subscribe((respo) => {
      for (const post of respo) {
        this.getPost(post);
      }
    });
    // console.log(this.suggestionPost);
  }
}
