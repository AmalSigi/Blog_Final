import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { categoryApi } from 'src/app/core/http/category.service';
import { postsAPi } from 'src/app/core/http/post.service';
import { trackDataService } from 'src/app/core/subjects/trackData.subject';

@Component({
  selector: 'app-user-subcategory',
  templateUrl: './user-subcategory.component.html',
})
export class UserSubcategoryComponent implements OnInit {
  constructor(
    private readonly postApi: postsAPi,
    private readonly route: ActivatedRoute,
    private readonly trackDataService: trackDataService,
    private readonly categoryApi: categoryApi
  ) {}

  public subcategoryPost: any = [];
  public categoryName: any;
  public subCategoryName: any;
  public categoryCoverPic!: any;
  ngOnInit(): void {
    this.mainCall();
  }
  public reloadData: Subscription = this.trackDataService
    .getClickEvent1()
    .subscribe(() => {
      this.subcategoryPost = [];
    });

  public mainCall() {
    this.route.params.subscribe((params) => {
      if (params['subcategoryId']) {
        const subcategoryId = params['subcategoryId'];
        this.getSubCategory(subcategoryId);
        this.getSubCategoryById(subcategoryId);
      }
    });
  }

  public getSubCategoryById(subcategoryId: any) {
    this.categoryApi
      .getSubcategoryById(subcategoryId)
      .subscribe((respo: any) => {
        console.log(respo);
        this.categoryName = respo.category.categoryName;
        this.categoryCoverPic = respo.category.coverPicturePath;
        this.subCategoryName = respo.subCategoryName;
      });
  }

  public getSubCategory(subcategoryId: number) {
    this.postApi.getPostBySubCategory(subcategoryId).subscribe((respo) => {
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

      this.subcategoryPost.push(obj);
    });
  }
}
