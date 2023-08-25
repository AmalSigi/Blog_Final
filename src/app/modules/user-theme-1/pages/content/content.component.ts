import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { authenticationApi } from 'src/app/core/http/authentication.service';
import { commentsApi } from 'src/app/core/http/comments.service';
import { postsAPi } from 'src/app/core/http/post.service';
import { siteSettingApi } from 'src/app/core/http/site-setting.service';
import { checkLoginService } from 'src/app/core/services/checkUserStatus.service';
import { trackDataService } from 'src/app/core/subjects/trackData.subject';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
})
export class UserContentComponent {
  constructor(
    private readonly postApi: postsAPi,
    private readonly commentsApi: commentsApi,
    private fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly loginStatusService: checkLoginService,
    private readonly trackDataService: trackDataService,
    private readonly sitesetting: siteSettingApi,
    private readonly authApi: authenticationApi,
    private readonly subject: trackDataService
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
  public reload: Subscription = this.subject.getClickEvent1().subscribe(() => {
    this.getContent();
  });
  public replies:boolean=false;
public reply(){
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
public latest:any=[]
public latestPost:any=[]
ngOnInit(): void {
  this.getContent();

}
public getLatestPost() {
  const length = 4;
  this.postApi.getLatestPosts(length).subscribe((respo) => {
    console.log(respo);
    const categoryName = respo.category?.categoryName ;
    this.latestPost = this.postToArray(respo);
 

    console.log(this.latestPost)
    
  });
}
public getLatestPostByViewCount() {
  const length = 5;
  this.postApi.getLatestPosts(length).subscribe((respo) => {
    console.log(respo);
    const categoryName = respo.category?.categoryName ;
    this.latest = this.postToArray(respo);

   
    this.latest.sort((a: any, b: any) => b.viewCount - a.viewCount);

    
    const top5posts = this.latest.slice(0, 5);
    top5posts.forEach((post: any, index: number) => {
      post.id = index + 1;
    });
    console.log(top5posts);
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
      viewCount:element.viewCount,
      createdAt:element.createdAt,
      fullName:element.author.firstName + ' ' + element.author.lastName
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
      this.getRecommendedPost(this.postId);
      this.getLatestPost();
      this.getLatestPostByViewCount();
    }
  });

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
  return this.postApi.getBlogPostById(postId);
}

public getMainPost(postId: number) {
  this.postCall(postId).subscribe((repo) => {
    console.log(repo);
    this.post = repo;
    this.getRecommendedPost(repo.id);
    this.enableComments = repo.enableComments;

    this.getMoreArticles(repo.subCategoryId);
  });
}

public getFilteredPostForRecommend(post: any) {
  this.suggestionPost = [];
  this.postCall(post.postId).subscribe((repo) => {
    console.log(repo);
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
  this.sitesetting.getSiteSetting().subscribe((respo: any) => {
    let commentStatus = respo.find((item: any) => item.id == 4);
    this.commentStatus = JSON.parse(commentStatus.settingValue);
  });
}

public getComments(postId: number) {
  this.commentsApi.getAllCommentsForBolg(postId).subscribe((respo: any) => {
    this.comments = this.getParentsWithChildComments(respo.comments);
    console.log(this.comments);
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
    this.commentsApi
      .postComment(this.post.id, this.commentForm.value)
      .subscribe((_repo) => {
        this.commentForm.reset();
        this.getComments(this.postId);
      });
  } else {
    // // guest user send function
    this.guestCommentForm.controls['parentId'].setValue(this.parentId);

    this.commentsApi
      .postGuestUserComment(this.post.id, this.guestCommentForm.value)
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
  this.commentsApi.getSingleComment(parentId).subscribe((repo: any) => {
    comment.parentAuthor = repo.author.firstName;
    this.replayCommentData.push(comment);
  });
}
// // Recommended
public getRecommendedPost(postId: number) {
  this.postApi.getRecommendedPost(9, postId).subscribe((respo) => {
    console.log(respo);
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
