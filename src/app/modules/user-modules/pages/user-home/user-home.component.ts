import { Component, OnInit } from '@angular/core';
import { Observable, empty } from 'rxjs';
import { categoryApi } from 'src/app/core/http/category.service';
import { editorsPickApi } from 'src/app/core/http/editorsPick.services';
import { postsAPi } from 'src/app/core/http/post.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
})
export class UserHomeComponent implements OnInit {
  public latestPost?: any = [];
  public editorialPick?: any = [];
  public catgoryDetailes: any = [];
  public temparray: any = [];

  constructor(
    private readonly postApi: postsAPi,
    private readonly categoryApi: categoryApi,
    private readonly editorsPickApi: editorsPickApi
  ) {}
  ngOnInit(): void {
    this.getLatestPost();
    this.getCategory();
    this.getEditorsPick();
  }

  public getLatestPost() {
    const length = 4;

    this.postApi.getLatestPosts(length).subscribe((respo) => {
      this.latestPost = this.postToArray(respo);
    });
  }

  public getEditorsPick() {
    this.editorsPickApi.getBlogEditorsPick().subscribe({
      next: (response) => {
        console.log(response);
        response.forEach((post: any) => {
          this.getPost(post.postId);
        });
      },
    });
  }
  public getPost(postId: number) {
    this.postApi.getBlogPostById(postId).subscribe((respo) => {
      this.temparray.push(respo);
      this.editorialPick = this.postToArray(this.temparray);
      console.log(this.editorialPick);
    });
  }

  // category
  public getCategory() {
    let categoryId: any;
    let categoryName: any;

    this.categoryApi.getCategory().subscribe((respo: any) => {
      respo.forEach((element: any) => {
        this.getCategoryPost(element);
      });
    });
  }

  public getCategoryPost(category: any) {
    this.postApi
      .getPostByCategoryByLength(category.id, 4)
      .subscribe((respo: any) => {
        if (respo.length > 0) {
          let obj = {
            categoryId: category.id,
            categoryName: category.categoryName,
            categoryPost: this.postToArray(respo),
          };
          this.catgoryDetailes.push(obj);
        }
      });
  }

  public postToArray(post: any) {
    // console.log(post);
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
