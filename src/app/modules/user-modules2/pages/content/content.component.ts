import { Component } from '@angular/core';
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
  selector: 'app-content',
  templateUrl: './content.component.html',
})
export class UserContentComponent {
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
  public categoryId: any;
  public suggestionPost: any = [];
  public moreArticlePost: any = [];
  public commentStatus: boolean = false;
  public commentDiv: boolean = false;
  public replayInputBox: boolean = false;
  public viewReplyComments: boolean = false;
  public toggleReply: boolean = false;
  public parentCommentAuthor: string = 'comments';
  public parentId: any = null;
  public comments: any;
  public Testcomments: any[][] = [];
  public commentboxId: any;
  public replayCommentData: any = [];
  public totalCount = 0;
  public loginStatus: boolean = false;
  public enableComments!: boolean;
  public postId!: number;
  public openLogin: boolean = false;
  public userSignup: boolean = false;
  public userReg: boolean = false;
  public mediaFilePath: string = `${environment.url}/assets/`;
  public reload: Subscription = this.trackDataService
    .getClickEvent1()
    .subscribe(() => {
      this.getContent();
    });
  public replies: boolean = false;
  public reply() {
    this.replies = !this.replies;
  }
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
  public latest: any = [];
  public latestPost: any = [];
  ngOnInit(): void {
    this.getContent();
  }
  navigateToUserProfile(author: any) {
    const queryParams = {
      firstName: author.firstName,
      lastName: author.lastName,
      profilePicture: author.profilePicturePath,
      email: author.email,
    };

    this.router.navigate(['/Theme2/userprofile'], {
      queryParams: { authorId: author },
    });
  }
  public getLatestPost() {
    const length = 4;
    this.publicapi.getLatestPosts(length).subscribe((respo) => {
      const categoryName = respo.category?.categoryName;
      this.latestPost = this.postToArray(respo);
    });
  }
  public getLatestPostByViewCount() {
    const length = 5;
    this.publicapi.getLatestPosts(length).subscribe((respo) => {
      const categoryName = respo.category?.categoryName;
      this.latest = this.postToArray(respo);

      this.latest.sort((a: any, b: any) => b.viewCount - a.viewCount);

      const top5posts = this.latest.slice(0, 5);
      top5posts.forEach((post: any, index: number) => {
        post.id = index + 1;
      });
    });
  }
  public postToArray(post: any) {
    let temp: any = [];
    post.forEach((element: any) => {
      let heading = element.postSections.filter(
        (item: any) => item.sectionTypeId == 1
      );
      let img = element.postSections.filter(
        (item: any) => item.sectionTypeId == 4
      );

      let subHeading = element.postSections.filter(
        (item: any) => item.sectionTypeId == 2
      );
      let obj = {
        postId: element.id,
        heading: heading[0],
        subHeading: subHeading[0],
        img: img[0],
        categoryName: element.category?.categoryName || 'Uncategorized',
        viewCount: element.viewCount,
        createdAt: element.createdAt,
        fullName: element.author.firstName + ' ' + element.author.lastName,
      };

      temp.push(obj);
    });
    return temp;
  }

  public getContent(): void {
    this.route.params.subscribe((params) => {
      if (params['postId']) {
        this.postId = params['postId'];
        this.moreArticlePost = [];
        this.getMainPost(this.postId);
        this.getComments(this.postId);
        this.commentEnable();
        // this.getRecommendedPost(this.postId);
        this.getLatestPost();
        this.getLatestPostByViewCount();
      }
    });
    this.checkLogin();
  }
  public checkLogin() {
    this.authApi.isAuthorized().subscribe({
      next: () => {
        this.loginStatus = true;
      },
      error: () => {
        this.loginStatus = false;
      },
    });
  }
  //Report comment

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
  public reportComment(commentId: number) {
    if (this.loginStatus) {
      this.publicapi.reportComment(commentId).subscribe(
        (data) => {
          alert('Reported succeesfully');
          this.getComments(this.postId);
        },
        (error) => {
          alert('Something went wrong');
        }
      );
    } else {
      this.openLogin = true;
    }
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
  openLoginComponent() {
    this.openLogin = true;
  }

  closeLoginComponent() {
    this.openLogin = false;
  }

  openSignupComponent() {
    this.userSignup = true;
    // this.cdr.detectChanges();
  }

  closeSignupComponent() {
    this.userSignup = false;
    // this.cdr.detectChanges();
  }
  public findIndex(id: number, sectionId: number): number {
    const index = this.post.postSections[
      sectionId
    ]?.sectionAttributes.findIndex(
      (item: any) => item.sectionAttributeId == id
    );
    return index;
  }
  public getImageStyle(height: string, width: string) {
    if (height == 'null' || (0 && width == 'null') || 0) {
      return {}; // Empty object to reset styles
    } else {
      return { height: `${height}px`, width: `${width}px` };
    }
  }
}
