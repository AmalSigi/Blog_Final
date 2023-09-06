import { Component, OnInit } from '@angular/core';
import { PublicService } from 'src/app/core/http/public.service';
import { environment } from 'src/enviroment/enviroment';
@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
})
export class UserHomeComponent implements OnInit {
  public latestPost?: any = [];
  public editorialPick?: any = [];
  public catgoryDetailes: any = [];
  public temparray: any = [];
  public randomAd: any;
  public mediaFilePath: string = `${environment.url}/assets/`;
  constructor(private readonly publicapi: PublicService) {}
  ngOnInit(): void {
    this.getLatestPost();
    this.getCategory();
    this.getEditorsPick();
    this.getRandom();
  }

  public getLatestPost() {
    const length = 4;

    this.publicapi.getLatestPosts(length).subscribe((respo) => {
      this.latestPost = this.postToArray(respo);
    });
  }

  public getRandom() {
    this.publicapi.getThemeRandomAdvertisements().subscribe({
      next: (respo: any) => {
        console.log(respo);
        this.randomAd = respo;
      },
    });
  }

  public getEditorsPick() {
    this.publicapi.getEditorsPick().subscribe({
      next: (response) => {
        response.forEach((post: any) => {
          this.getPost(post.postId);
        });
      },
    });
  }
  public getPost(postId: number) {
    this.publicapi.getPostByPostId(postId).subscribe((respo) => {
      this.temparray.push(respo);
      this.editorialPick = this.postToArray(this.temparray);
    });
  }

  // category
  public getCategory() {
    let categoryId: any;
    let categoryName: any;

    this.publicapi.getCategory().subscribe((respo: any) => {
      respo.forEach((element: any) => {
        this.getCategoryPost(element);
      });
    });
  }

  public getCategoryPost(category: any) {
    this.publicapi
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
