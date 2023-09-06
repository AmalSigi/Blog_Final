import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { categoryApi } from 'src/app/core/http/category.service';
import { commentsApi } from 'src/app/core/http/comments.service';
import { postsAPi } from 'src/app/core/http/post.service';
import { PublicService } from 'src/app/core/http/public.service';
import { trackDataService } from 'src/app/core/subjects/trackData.subject';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
})
export class UserCategoryComponent {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly trackDataService: trackDataService,
    private readonly router: Router,
    private readonly publicapi: PublicService
  ) {}
  public latestPost: any = [];
  public latest: any = [];
  public categoryPost: any = [];
  public categoryName: any;
  public categoryCoverPic!: any;
  ngOnInit(): void {
    //this.categoryPost = [];

    this.mainCall();
  }
  navigateToUserProfile(author: any) {
    this.router.navigate(['/Theme2/userprofile'], {
      queryParams: { authorId: author },
    });
  }
  public reloadData: Subscription = this.trackDataService
    .getClickEvent1()
    .subscribe(() => {
      //  this.categoryPost = [];
    });

  public mainCall() {
    this.route.params.subscribe((params) => {
      if (params['categoryId']) {
        const categoryId = params['categoryId'];
        this.categoryPost = [];
        this.getPostByCategory(categoryId);
        this.getCategoryDetailesById(categoryId);
        this.getLatestPost();
        this.getLatestPostByViewCount();
      }
    });
  }

  public getCategoryDetailesById(categoryId: number) {
    this.publicapi.getCategoryById(categoryId).subscribe((respo: any) => {
      console.log(respo);
      this.categoryName = respo.categoryName;
      this.categoryCoverPic = respo.coverPicturePath;
    });
  }

  public getPostByCategory(categoryId: number) {
    this.publicapi.getPostByCategoryId(categoryId).subscribe((respo) => {
      console.log(respo);
      for (const post of respo) {
        let heading = post.postSections.filter(
          (item: any) => item.sectionTypeId == 1
        );
        let img = post.postSections.filter(
          (item: any) => item.sectionTypeId == 4
        );

        let subHeading = post.postSections.filter(
          (item: any) => item.sectionTypeId == 2
        );
        this.publicapi
          .getCommentsCount(post.id, 'Active')
          .subscribe((commentsCountResponse) => {
            const commentsCount = commentsCountResponse.count;
            let obj = {
              postId: post.id,
              heading: heading[0],
              subHeading: subHeading[0],
              img: img[0],
              fullName: post.author.firstName + ' ' + post.author.lastName,
              profilePicture: post.author.profilePicturePath,
              viewCount: post.viewCount,
              createdAt: post.createdAt,
              commentsCount: commentsCount,
              authorId: post.author.id,
            };

            this.categoryPost.push(obj);
            console.log(this.categoryPost);
          });
      }
    });
  }
  public getLatestPost() {
    const length = 4;
    this.publicapi.getLatestPosts(length).subscribe((respo) => {
      console.log(respo);
      const categoryName = respo.category?.categoryName;
      this.latestPost = this.postToArray(respo);

      console.log(this.latestPost);
    });
  }
  public getLatestPostByViewCount() {
    const length = 5;
    this.publicapi.getLatestPosts(length).subscribe((respo) => {
      console.log(respo);
      const categoryName = respo.category?.categoryName;
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
        viewCount: element.viewCount,
        createdAt: element.createdAt,
        fullName: element.author.firstName + ' ' + element.author.lastName,
      };

      temp.push(obj);
    });
    return temp;
  }
  public postCall(postId: any) {
    return this.publicapi.getPostByPostId(postId);
  }
  getImageUrl(imgPath: string): string {
    return 'http://192.168.29.97:5296/assets/' + imgPath;
  }
}
