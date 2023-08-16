import { Component, OnInit } from "@angular/core";
import { editorsPickApi } from "src/app/core/http/editorsPick.services";
import { postsAPi } from "src/app/core/http/post.service";
import { OffsetService } from "src/app/core/services/pagination.service";

@Component({
    selector:'app-editorsPick',
    templateUrl: './editorsPick.component.html'
})
export class EditorsPickComponent implements OnInit{
    constructor(private readonly editorService:editorsPickApi,
      private readonly postApi:postsAPi,
      private readonly setOffsetService:OffsetService){}
    public posts:any=[];
    public totalData!:number;

    ngOnInit() {
        this.loadPost();
    }
    public loadPost (){
      const offset = this.setOffsetService.offset();
      const length = this.setOffsetService.pageSize;
this.editorService.EditorsPick(offset,length).subscribe({
    next:(resp)=>{
      this.totalData=resp.length;
        console.log(resp);
        resp.forEach((post:any)=>{
            this.getPost(post?.id)

                })
    }
    
})
    }
    public getPost(postId: number) {
this.postApi.getPostById(postId).subscribe({
  next:(response)=>{
    console.log(response)
    this.posts.push(response);
  }
})

    
    
        
    
        }
        public pagiantion(){
          this.loadPost();
          this.posts=[];
        }
}