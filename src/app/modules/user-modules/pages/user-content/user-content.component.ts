import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { authenticationApi } from 'src/app/core/http/authentication.service';
import { PublicService } from 'src/app/core/http/public.service';
import { checkLoginService } from 'src/app/core/services/checkUserStatus.service';
import { trackDataService } from 'src/app/core/subjects/trackData.subject';
import { environment } from 'src/enviroment/enviroment';
@Component({
  selector: 'app-user-content',
  templateUrl: './user-content.component.html',
})
export class UserContentComponent implements OnInit {
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  constructor(
    private fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly loginStatusService: checkLoginService,
    private readonly trackDataService: trackDataService,
    private readonly authApi: authenticationApi,
    private readonly router: Router,
    private readonly publicapi: PublicService
  ) {}
  public post: any;
  public totalLength!: number;
  public openComments: boolean = false;
  public openLogin: boolean = false;
  public categoryId: any;
  public comments: any;
  public commentboxId: any;
  public parentId: any = null;
  public suggestionPost: any = [];
  public moreArticlePost: any = [];
  public replayCommentData: any = [];
  public Testcomments: any[][] = [];
  public commentStatus: boolean = false;
  public commentDiv: boolean = false;
  public replayInputBox: boolean = false;
  public viewReplyComments: boolean = false;
  public toggleReply: boolean = false;
  public loginStatus: boolean = false;
  public userSignup: boolean = false;
  public enableComments!: boolean;
  public parentCommentAuthor: string = 'comments';
  public totalCount = 0;
  public postId!: number;
  public mediaFilePath: string = `${environment.url}/assets/`;
  public reload: Subscription = this.trackDataService
    .getClickEvent1()
    .subscribe(() => {
      this.getContent();
    });

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
  public findIndex(id: number, sectionId: number): number {
    const index = this.post.postSections[
      sectionId
    ]?.sectionAttributes.findIndex(
      (item: any) => item.sectionAttributeId == id
    );
    return index;
  }
  public getContent(): void {
    this.route.params.subscribe((params) => {
      if (params['postId']) {
        this.postId = params['postId'];
        this.moreArticlePost = [];
        this.getMainPost(this.postId);
        this.getComments(this.postId);
        this.commentEnable();
        this.checkigLogin();
      }
    });
  }

  public checkigLogin() {
    this.authApi.isAuthorized().subscribe({
      next: () => {
        this.loginStatus = true;
      },
      error: () => {
        this.loginStatus = false;
      },
    });
  }

  public reloadData: Subscription = this.trackDataService
    .getClickEvent1()
    .subscribe(() => {
      this.moreArticlePost = [];
      this.getContent();
    });
  // // Post

  public postCall(postId: any) {
    return this.publicapi.getPostByPostId(postId);
  }

  public getMainPost(postId: number) {
    this.postCall(postId).subscribe((repo) => {
      this.post = repo;
      this.getRecommendedPost(repo.id);
      this.enableComments = repo.enableComments;

      this.getMoreArticles(repo.subCategoryId);
    });
  }

  public getFilteredPostForRecommend(post: any) {
    this.suggestionPost = [];
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
        postId: repo.id,
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
    });
  }

  // // comments

  public commentEnable() {
    this.publicapi.getSiteSetting().subscribe((respo: any) => {
      let commentStatus = respo.find((item: any) => item.id == 4);
      this.commentStatus = JSON.parse(commentStatus.settingValue);
    });
  }

  public getComments(postId: number) {
    this.publicapi.getAllCommentByPostId(postId).subscribe((respo: any) => {
      this.totalLength = respo.totalLength;
      this.comments = this.getParentsWithChildComments(respo.comments);
    });
  }

  public getParentsWithChildComments(comments: any[]): any[][] {
    let parentComments = comments.filter((c) => c.parentId == null);
    let listOfParentsWithChildren: any[][] = [];
    for (const comment of parentComments) {
      let parentWithChild: any[] = [];
      getallchildren(comment);
      listOfParentsWithChildren.push(parentWithChild);

      function getallchildren(parent: any) {
        parentWithChild.push(parent);
        for (const comment of comments) {
          if (comment.parentId == parent.id) {
            getallchildren(comment);
          }
        }
      }
    }
    return listOfParentsWithChildren;
  }

  public report(cmt: any) {
    if (this.loginStatus) {
      this.publicapi.reportComment(cmt.id).subscribe({
        next: (respo) => {
          alert(
            `You have reported ${cmt.author.firstName} ${cmt.author.lastName} comment`
          );
        },
      });
    } else {
      alert('login to report');
      this.openLogin = true;
    }
  }

  // //reply comments
  public replyBox(comment: any) {
    this.replayInputBox = true;
    this.toggleReply = true;

    this.parentCommentAuthor = `@${comment.author.firstName}`;

    if (comment.id != this.parentId) {
      this.parentId = comment.id;
    }
  }

  public closeReplyTag() {
    this.commentForm.reset();
    this.toggleReply = false;
    this.parentId = null;
    this.commentboxId = -1;
    this.viewReplyComments = false;
  }
  public sendReply() {
    if (this.loginStatus) {
      // // logged user send function
      this.commentForm.controls['parentId'].setValue(this.parentId);
      this.publicapi
        .postComment(this.post.id, this.commentForm.value)
        .subscribe((_repo) => {
          this.commentForm.reset();
          this.getComments(this.postId);
        });
    } else {
      // // guest user send function
      this.guestCommentForm.controls['parentId'].setValue(this.parentId);

      this.publicapi
        .postGuestComment(this.post.id, this.guestCommentForm.value)
        .subscribe((repo) => {
          this.guestCommentForm.reset();
          this.getComments(this.postId);
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
    this.publicapi.getCommentByCommentId(parentId).subscribe((repo: any) => {
      comment.parentAuthor = repo.author.firstName;
      this.replayCommentData.push(comment);
    });
  }
  // // Recommended
  public getRecommendedPost(postId: number) {
    this.publicapi
      .getPostSuggestionByPostIdCount(9, postId)
      .subscribe((respo) => {
        for (const post of respo) {
          this.getFilteredPostForRecommend(post);
        }
      });
  }

  public getMoreArticles(subcategoryId: number) {
    this.publicapi
      .getPostBySubategoryByLength(subcategoryId, 4)
      .subscribe((respo: any) => {
        respo = respo.filter((item: any) => item.id != this.post.id);

        for (const post of respo) {
          this.getFilteredPostForMoreArticle(post);
        }
      });
  }

  // login
  public showDiv() {
    this.getContent();
    this.openLogin = false;
  }
  public getImageStyle(height: string, width: string) {
    if (height == 'null' || (0 && width == 'null') || 0) {
      return {}; // Empty object to reset styles
    } else {
      return { height: `${height}px`, width: `${width}px` };
    }
  }

  // author profile

  navigateToUserProfile(author: any) {
    this.router.navigate(['/author-profile'], {
      queryParams: { authorId: author },
    });
  }
  public opencomm() {
    if (this.totalLength > 0) {
      this.openComments = !this.openComments;
    } else {
      this.openComments = false;
    }
  }
}
