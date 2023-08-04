import { Component } from "@angular/core";
import { postsAPi } from "src/app/core/http/post.service";

@Component({
    selector: "app-post-trashed",
        templateUrl: "./trashed.component.html",
        
})
export class PostsTrashedComponent{
    constructor(private readonly postsService: postsAPi){}
    public posts:any;
    ngOnInit(){
        this.loadPosts();
    }
        public loadPosts(){
            this.postsService.getPosts().subscribe({
              next:(response)=>{
          console.log(response);
          
                  this.posts = response.filter((post:any)=>post.postStatus=='Deleted');
              }
           })
        }
}