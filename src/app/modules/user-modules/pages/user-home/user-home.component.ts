import { Component, OnInit } from '@angular/core';
import { Observable, empty } from 'rxjs';
import { categoryApi } from 'src/app/core/http/category.service';
import { postsAPi } from 'src/app/core/http/post.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
})
export class UserHomeComponent implements OnInit {
  public latestPost?: any = [];
  public catgoryDetailes: any = [];

  constructor(
    private readonly postApi: postsAPi,
    private readonly categoryApi: categoryApi
  ) {}
  ngOnInit(): void {
    this.getLatestPost();
    this.getCategory();
  }

  public getLatestPost() {
    const length = 4;
    this.postApi.getLatestPosts(length).subscribe((respo) => {
      this.latestPost = this.postToArray(respo);
    });
  }

  public getCategory() {
    let categoryId: any;
    let categoryName: any;

    this.categoryApi.getCategory().subscribe((respo: any) => {
      respo.forEach((element: any) => {
        this.getCategoryPost(element);
      });
    });
  }

  public getCategoryPost(post: any) {
    this.postApi
      .getPostByCategoryByLength(post.id, 4)
      .subscribe((respo: any) => {
        if (respo.length != 0) {
          let obj = {
            categoryId: post.id,
            categoryName: post.categoryName,
            categoryPost: this.postToArray(respo),
          };
          this.catgoryDetailes.push(obj);
          console.log(this.catgoryDetailes);
        }
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
      };

      temp.push(obj);
    });
    return temp;
  }
}
