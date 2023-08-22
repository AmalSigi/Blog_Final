import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { categoryApi } from 'src/app/core/http/category.service';
import { postsAPi } from 'src/app/core/http/post.service';
import { OffsetService } from 'src/app/core/services/pagination.service';
import { trackDataService } from 'src/app/core/subjects/trackData.subject';

@Component({
  selector: 'app-user-category',
  templateUrl: './user-category.component.html',
})
export class UserCategoryComponent implements OnInit {
  constructor(
    private readonly postApi: postsAPi,
    private readonly route: ActivatedRoute,
    private readonly trackDataService: trackDataService,
    private readonly categoryApi: categoryApi
  ) {}

  public categoryPost: any = [];
  public categoryName: any;
  public categoryCoverPic!: any;
  ngOnInit(): void {
    this.mainCall();
  }
  public reloadData: Subscription = this.trackDataService
    .getClickEvent1()
    .subscribe(() => {
      this.categoryPost = [];
    });

  public mainCall() {
    this.route.params.subscribe((params) => {
      if (params['categoryId']) {
        const categoryId = params['categoryId'];
        this.getPostByCategory(categoryId);
        this.getCategoryDetailesById(categoryId);
      }
    });
  }

  public getCategoryDetailesById(categoryId: number) {
    this.categoryApi.getCategoryById(categoryId).subscribe((respo: any) => {
      console.log(respo);
      this.categoryName = respo.categoryName;
      this.categoryCoverPic = respo.coverPicturePath;
    });
  }

  public getPostByCategory(categoryId: number) {
    this.postApi.getPostByCategory(categoryId).subscribe((respo) => {
      for (const post of respo) {
        this.getPost(post);
      }
    });
  }
  public postCall(postId: any) {
    return this.postApi.getPostByIdForBlog(postId);
  }
  public getPost(post: any) {
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

      this.categoryPost.push(obj);
    });
  }
}
