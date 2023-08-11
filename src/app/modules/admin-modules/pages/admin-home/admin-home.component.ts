import { Component } from '@angular/core';
import { postsAPi } from 'src/app/core/http/post.service';
import { userApi } from 'src/app/core/http/userAccount.service';
import { postData } from 'src/app/core/services/posts.services';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
})
export class AdminHomeComponent {
  constructor(private readonly postData: postData,
    private readonly postAPi:postsAPi,
    private readonly userApi:userApi) {}
  posts: any;
  public users: any;
  public viewPost: boolean=false;
  public singlePost!:any;
  public activeBlogs:number=0;
  public activeUsers:number=0;
  public totalViews:number=0;

  ngOnInit(): void {
    this.getPosts();
    this.getUsers();
  }
  public getPosts(): void {
this.postAPi.getFilteredPosts('Active',0,10).subscribe({
  next:(response)=>{
    this.posts=response;
    this.activeBlogs=response.totalLength;

console.log(response)
  }
})
  }
  public getUsers(): void {
    this.userApi.getFilteredUsers('Active',0,10).subscribe({
      next:(response)=>{
        this.users=response;
        this.activeUsers=response.totalLength;
    console.log(response)
      }
    
    })
    this.postAPi.totalViews('Active').subscribe({
      next:(response)=>{
        console.log(response)
this.totalViews=response.count;
      }
    })
      }
      public ToggleModal(post:any){
this.singlePost=post;
this.viewPost
      }
}
