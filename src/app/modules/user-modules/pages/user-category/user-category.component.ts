import { Component, OnInit } from '@angular/core';
import { postsAPi } from 'src/app/core/http/post.service';

@Component({
  selector: 'app-user-category',
  templateUrl: './user-category.component.html',
})
export class UserCategoryComponent implements OnInit {
  constructor(private readonly postApi: postsAPi) {}
  public categoryPost: any = [];
  ngOnInit(): void {
    this.getPostByCategory();
  }

  public getPostByCategory() {
    this.postApi.getPostByCategory(1).subscribe((respo) => {
      for (const post of respo) {
        this.getPost(post);
      }
    });
  }
  public postCall(postId: any) {
    return this.postApi.getPostById(postId);
  }
  public getPost(post: any) {
    console.log(post);
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
      console.log(this.categoryPost);
    });
  }
}
