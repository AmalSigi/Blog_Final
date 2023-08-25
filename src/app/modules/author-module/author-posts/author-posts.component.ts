import { Component } from "@angular/core";
import { postsAPi } from "src/app/core/http/post.service";
import { userApi } from "src/app/core/http/userAccount.service";

@Component({
    selector:'app-posts',
    templateUrl:'./author-posts.component.html'
})
export class AuthorPosts{
    constructor(private readonly postApi: postsAPi,private readonly userApi:userApi) {}
    public publishCount: number = 0;
    public draftCount: number = 0;
    public trashCount: number = 0;
    public user:any
    ngOnInit() {
        this.userApi.currentUserDetails().subscribe((res)=>{
    
       
       this.user=res
       this.fetchPosts(this.user.id);
         })
   
    }
    public fetchPosts(userId: number) {
      this.postApi.allOwnPosts(userId).subscribe({
        next: (res) => {
          const activePosts = res?.posts.filter((item: any) => item.postStatus === 'Active');
      const draftPosts = res?.posts.filter((item: any) => item.postStatus === 'Draft');
      const deletedPosts = res?.posts.filter((item: any) => item.postStatus === 'Deleted');

      this.draftCount = draftPosts.length;
      console.log(this.draftCount)
      this.publishCount = activePosts.length;
      this.trashCount = deletedPosts.length;
        },
        
      });
    }
      
  }
