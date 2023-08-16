import { Component } from '@angular/core';
import { editorsPickApi } from 'src/app/core/http/editorsPick.services';
import { postsAPi } from 'src/app/core/http/post.service';
import { userApi } from 'src/app/core/http/userAccount.service';
import { postData } from 'src/app/core/services/posts.services';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
})
export class AdminHomeComponent {
  constructor(
    private readonly postData: postData,
    private readonly postAPi: postsAPi,
    private readonly userApi: userApi,
    private readonly pickApi: editorsPickApi
  ) {}
  posts: any;
  public users: any;
  public viewPost: boolean = false;
  public singlePost!: any;
  public activeBlogs: number = 0;
  public activeUsers: number = 0;
  public totalViews: number = 0;
  public editorsPickPost: any = [];

  ngOnInit(): void {
    this.getPosts();
    this.getUsers();
    this.getEditorsPick();
  }
  public getPosts(): void {
    this.postAPi.getFilteredPosts('Active', 0, 10, undefined).subscribe({
      next: (response) => {
        this.posts = response;
        this.activeBlogs = response.totalLength;

        console.log(response);
      },
    });
  }
  public getEditorsPick() {
    this.pickApi.getBlogEditorsPick().subscribe({
      next: (response) => {
        console.log(response);
        response.forEach((post: any) => {
          this.getRecommendedPost(post.id);
        });
      },
    });
  }
  public getRecommendedPost(postId: number) {
    this.postAPi.getPostById(postId).subscribe((respo) => {
      this.getPost(respo);
      console.log(respo);
    });

    // console.log(this.suggestionPost);
  }
  public getPost(post: any) {
    // console.log(post);

    let heading = post.postSections.filter(
      (item: any) => item.sectionTypeId == 1
    );

    let img = post.postSections.filter((item: any) => item.sectionTypeId == 4);

    let subHeading = post.postSections.filter(
      (item: any) => item.sectionTypeId == 2
    );

    let obj = {
      postId: post.postId,

      heading: heading[0],

      subHeading: subHeading[0],

      img: img[0],
    };

    this.editorsPickPost.push(obj);
  }
  public getUsers(): void {
    this.userApi.getFilteredUsers('Active', 0, 10).subscribe({
      next: (response) => {
        this.users = response;
        this.activeUsers = response.totalLength;
        console.log(response);
      },
    });
    this.postAPi.totalViews('Active').subscribe({
      next: (response) => {
        console.log(response);
        this.totalViews = response.count;
      },
    });
  }
  public ToggleModal(post: any) {
    this.singlePost = post;
    this.viewPost = true;
  }
}
