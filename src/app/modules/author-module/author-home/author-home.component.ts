import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component } from "@angular/core";
import { postsAPi } from "src/app/core/http/post.service";
import { userApi } from "src/app/core/http/userAccount.service";

@Component({
    selector:'app-home-author',
    templateUrl:'./author-home.component.html',
    
})
export class AuthorHomeComponent{

    constructor(private readonly postData:postsAPi, private readonly userApi:userApi, 
      //private readonly toggleOffset: OffsetService,
      ) 
      {}
    user:any;
  posts: any[]=[];
  totalViewCount: number = 0;
  public commentDiv:boolean=false;
  public post:any
  public postsToShow: number = 5;
  public postsIncrement: number = 5;
  public totalLength: number = 0;

//   ngOnInit(): void {
//     this.posts = this.postData.postData;
//     console.log(this.posts);
//   }
ngOnInit(){
  this.userApi.currentUserDetails().subscribe((res)=>{
     // console.log("response", res);

this.user=res
this.fetchPosts(this.user.id);
  })
}
public fetchPosts(userId:number){
  //const offset = this.toggleOffset.offset();
  //const length = this.toggleOffset.pageSize;

  this.postData.allOwnPosts(userId).subscribe((res)=>{
  //  console.log(res)
    this.totalLength = res.totalLength;
    this.posts=res.posts;
    this.calculateTotalViewCount()
  })
}
calculateTotalViewCount() {
  this.totalViewCount = this.posts.reduce((total, post) => total + post.viewCount, 0);
}

public showBox(index:number) {
  this.commentDiv = true;
  
  this.post=this.posts[index]
}
showMorePosts() {
 

  
 
    this.postsToShow += this.postsIncrement;
    
 
}
showLessPosts(){
  this.postsToShow -= this.postsIncrement
}


}