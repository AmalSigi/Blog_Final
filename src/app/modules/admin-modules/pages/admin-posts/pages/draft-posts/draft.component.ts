import { Component } from "@angular/core";
import { postsAPi } from "src/app/core/http/post.service";

@Component({
    selector: "app-post-draft",
        templateUrl: "./draft.component.html",
        
})
export class PostDraftComponent{
    constructor(private readonly postsService: postsAPi){}
public posts:any;
ngOnInit(){
    this.loadPosts();
}
    public loadPosts(){
        this.postsService.getPosts().subscribe({
          next:(response)=>{
      console.log(response);
      
              this.posts = response.filter((post:any)=>post.postStatus=='Draft');
          }
       })
    }

}