import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PublicService } from 'src/app/core/http/public.service';
import { trackDataService } from 'src/app/core/subjects/trackData.subject';
import { environment } from 'src/enviroment/enviroment';
@Component({
  selector: 'app-user-category',
  templateUrl: './user-category.component.html',
})
export class UserCategoryComponent implements OnInit {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly trackDataService: trackDataService,
    private readonly publicapi: PublicService
  ) {}

  public categoryPost: any = [];
  public categoryName: any;
  public categoryCoverPic!: any;
  public loading: boolean = true;
  public mediaFilePath: string = `${environment.url}/assets/`;
  ngOnInit(): void {
    this.mainCall();
  }
  public reloadData: Subscription = this.trackDataService
    .getClickEvent1()
    .subscribe(() => {});

  public mainCall() {
    this.route.params.subscribe((params) => {
      if (params['categoryId']) {
        const categoryId = params['categoryId'];
        this.categoryPost = [];
        this.getPostByCategory(categoryId);
        this.getCategoryDetailesById(categoryId);
      }
    });
  }

  public getCategoryDetailesById(categoryId: number) {
    this.publicapi.getCategoryById(categoryId).subscribe({
      next: (respo: any) => {
        console.log(respo);
        this.categoryName = respo.categoryName;
        this.categoryCoverPic = respo.coverPicturePath;
      },
      error: (error) => {},
      complete: () => {
        this.loading = false;
      },
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
        let obj = {
          postId: post.id,
          heading: heading[0],
          subHeading: subHeading[0],
          img: img[0],
        };

        this.categoryPost.push(obj);
      }
    });
  }
  public postCall(postId: any) {
    return this.publicapi.getPostByPostId(postId);
  }
}
