import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { commentsApi } from 'src/app/core/http/comments.service';
import { postsAPi } from 'src/app/core/http/post.service';
import { checkLoginService } from 'src/app/core/services/checkUserStatus.service';
import { trackDataService } from 'src/app/core/subjects/trackData.subject';

@Component({
  selector: 'app-user-content',
  templateUrl: './user-content.component.html',
})
export class UserContentComponent implements OnInit {
  constructor(
    private readonly postApi: postsAPi,
    private readonly commentsApi: commentsApi,
    private fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly loginStatusService:checkLoginService,
    private readonly trackDataService: trackDataService
  ) {}
  public post: any;
  public categoryId: any;
  public suggestionPost: any = [];
  public moreArticlePost: any = [];
  public commentDiv: boolean = false;
  public replayInputBox: boolean = false;
  public viewReplyComments: boolean = false;
  public toggleReply: boolean = false;
  public parentCommentAuthor: string = 'comments';
  public parentId: any = null;
  public comments: any;
  public commentboxId: any;
  public replayCommentData: any = [];
  public totalCount = 0;
  public loginStatus!:boolean

  // //  form.......
  // // form user
  public commentForm = new FormGroup({
    content: new FormControl('', Validators.required),
    parentId: new FormControl(''),
  });
  // // form guest user
  public guestCommentForm = new FormGroup({
    content: new FormControl('', Validators.required),
    parentId: new FormControl(''),
    tempUser: this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
    }),
  });

  ngOnInit(): void {
this.getContent();
  }
  public getContent():void{
    this.route.params.subscribe((params) => {
      if (params['postId']) {
        const postId = params['postId'];
        this.moreArticlePost = [];
        this.getMainPost(postId);
        this.getComments(postId);
      }
    });
this.loginStatusService.checkLogin();
this.loginStatus=this.loginStatusService.autherized();
  }

  public reloadData: Subscription = this.trackDataService
    .getClickEvent1()
    .subscribe(() => {
      this.moreArticlePost = [];
      this.getContent();

    });
  // // Post

  public postCall(postId: any) {
    return this.postApi.getBlogPostById(postId);
  }

  public getMainPost(postId: number) {
    this.postCall(postId).subscribe((repo) => {
      this.post = repo;
      this.getRecommendedPost();
      this.getMoreArticles(repo.subCategoryId);
    });
  }

  public getFilteredPostForRecommend(post: any) {
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
    });
  }
  public getFilteredPostForMoreArticle(post: any) {
    this.postCall(post.id).subscribe((repo) => {
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
        postId: post.id,
        heading: heading[0],
        subHeading: subHeading[0],
        img: img[0],
      };

      this.moreArticlePost.push(obj);
      console.log(this.moreArticlePost);
    });
  }

  // // comments
  public getComments(postId: number) {
    console.log(postId)
    this.commentsApi.getAllCommentsForBolg(postId).subscribe((repo) => {
      console.log(repo)
      this.comments = repo.comments;
    });
  }

  // //reply comments
  public replyBox(comment: any) {
    this.replayInputBox = true;
    this.parentCommentAuthor = `@${comment.author.firstName}`;
    this.parentId = comment.id;
  }

  public closeReplyTag() {
    this.toggleReply = false;
    this.parentCommentAuthor = '';
  }
  public sendReply() {
    if (false) {
      // // logged user send function
      this.commentForm.controls['parentId'].setValue(this.parentId);
      // this.commentsApi
      //   .postComment(this.post.id, this.commentForm.value)
      //   .subscribe((_repo) => {
      //     this.commentForm.reset()
      //   });
    } else {
      // // guest user send function
      this.guestCommentForm.controls['parentId'].setValue(this.parentId);

      this.commentsApi
        .postGuestUserComment(this.post.id, this.guestCommentForm.value)
        .subscribe((repo) => {
          this.guestCommentForm.reset();
        });
    }
  }

  // // view replyComment

  public viewReplyBox(id: any, comment: any) {
    if (this.commentboxId == id) {
      this.viewReplyComments = false;
      this.replayInputBox = false;
      this.commentboxId = -1;
    } else {
      this.viewReplyComments = true;
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
        this.getFilteredPostForRecommend(post);
      }
    });
  }

  public getMoreArticles(subcategoryId: number) {
    this.postApi
      .getPostBySubategoryByLength(subcategoryId, 4)
      .subscribe((respo: any) => {
        respo = respo.filter((item: any) => item.id != this.post.id);

        for (const post of respo) {
          this.getFilteredPostForMoreArticle(post);
        }
      });
  }
}
