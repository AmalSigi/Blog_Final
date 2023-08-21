import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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
    private readonly trackDataService: trackDataService
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
      }
    });
  }

  public getPostByCategory(categoryId: number) {
    this.postApi.getPostByCategory(categoryId).subscribe((respo) => {
      for (const post of respo) {
        this.categoryName = post.category.categoryName;
        this.categoryCoverPic = post.category.coverPicturePath;
        this.getPost(post);
      }
    });
  }
  public postCall(postId: any) {
    return this.postApi.getPostById(postId);
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
        postId: post.postId,
        heading: heading[0],
        subHeading: subHeading[0],
        img: img[0],
      };
      this.categoryPost.push(obj);
    });
  }
}
