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
            this.postsService.getFilteredPosts('Deleted',0,10).subscribe({
                next:(response)=>{
                    this.posts = response;
                }
             })
        }
}