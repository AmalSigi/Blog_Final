import { Component } from "@angular/core";
import { combineLatest } from "rxjs";
import { commentsApi } from "src/app/core/http/comments.service";
import { postsAPi } from "src/app/core/http/post.service";
import { OffsetService } from "src/app/core/services/pagination.service";

@Component({
    selector:'author-comment',
    templateUrl:'./commentPost.component.html'
})
export class CommentPostComponent {
    constructor(
        private readonly postApi:postsAPi,
        private readonly commentApi:commentsApi,
        private offsetService:OffsetService ){}
    user:any
    public commentDiv: boolean = false;
    public post: any;
    public postInv: any;
    public currentPage: number = 1;
    public totalData!: number
    
    public totalLength: number = 0;
    ngOnInit(){
      
    this.fetchPosts()
    
     
    }
    
    public fetchPosts(){
    
        const offset=this.offsetService.offset();
        const length=this.offsetService.pageSize;
        const status='Active';
    
        this.postApi.AuthorpostHasComment(status,length,offset).subscribe((repo)=>{
            const posts=repo.posts;
            console.log(posts)
            const fetchCommentCounts=posts.map((post:any)=>{
                return this.commentApi.getCommentsCount(post.id,status);
            });
            combineLatest(fetchCommentCounts).subscribe((commentsCounts:any)=>{
    
    this.post=posts.filter((post:any,index:number)=>{
        const commentCount=commentsCounts[index].count;
        post.totalLength=commentCount;
        return commentCount>0;
    })
            })
            this.totalLength=repo.totalLength
        })
    
    }
    
    public showBox(postInv: any) {
        this.postInv = postInv;
        this.commentDiv = true;
      }
      public unshowBox() {
        this.commentDiv = false;
      }
      public onPageChange() {
    
    this.fetchPosts();
      }
}