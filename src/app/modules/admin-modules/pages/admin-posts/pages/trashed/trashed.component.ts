import { Component } from "@angular/core";
import { postsAPi } from "src/app/core/http/post.service";
import { OffsetService } from "src/app/core/services/pagination.service";

@Component({
    selector: "app-post-trashed",
        templateUrl: "./trashed.component.html",
        
})
export class PostsTrashedComponent{
    constructor(private readonly postsService: postsAPi,
        private readonly setOffset:OffsetService){}
    public posts:any;
    public totalData!:number;;
    ngOnInit(){
        this.loadPosts();
    }
        public loadPosts(){
            const offfset=this.setOffset.offset();
            this.postsService.getFilteredPosts('Deleted',offfset,this.setOffset.pageSize).subscribe({
                next:(response)=>{
                    this.totalData = response.totalLength;
                    this.posts = response;
                }
             })
        }
        public pagiantion(){

        this.loadPosts();

        }
}