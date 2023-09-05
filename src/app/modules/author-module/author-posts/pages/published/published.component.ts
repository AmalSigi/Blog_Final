import { Component, ElementRef, Input } from "@angular/core";
import { postsAPi } from "src/app/core/http/post.service";
import { userApi } from "src/app/core/http/userAccount.service";
import { OffsetService } from "src/app/core/services/pagination.service";

@Component({
    selector:'app-publish',
    templateUrl: './published.component.html'
})
export class AuthorPublishComponent{
  commentDiv: boolean=false;
 
  constructor(private readonly postsService: postsAPi,
    private readonly toggleOffset: OffsetService,
    private readonly userApi:userApi
  ,
    private readonly elementRef:ElementRef){}
 public posts:any;
 public viewPost:boolean = false;
  public showDiv:boolean=true;
  public listIndex!:number;
  public pageLength=5;
  public totalData!:number;
  public user:any;
  public post:any;

  ngOnInit() {
    this.userApi.currentUserDetails().subscribe((res)=>{

 
 this.user=res
 this.loadPosts(this.user.id);
   })
   
  }
  public loadPosts(userId:number){
    const offset = this.toggleOffset.offset();
    const length = this.toggleOffset.pageSize;
  
    this.postsService.ownPosts('Active',length,offset).subscribe({
      next:(response)=>{
        this.totalData=response.totalLength;
          this.posts = response.posts;
         //console.log(this.posts)
        //  this.totalData=response.totalLength;
          //console.log(this.totalData)
      }
   })
  }
  public toggleEditMenu(data:any,index:number){
    if (this.listIndex == index && this.showDiv == true) {
      this.showDiv = false;
    } else {
      this.listIndex = index;
      this.showDiv = true;
    }
  }
  
    public showBox(index:number) {
      this.commentDiv = true;
      
      this.post=this.posts[index]
    }
    public unshowBox() {
      this.commentDiv = false;
    }
    onDocumentClick(event: any) {
      if (!this.elementRef.nativeElement.contains(event.target)) {
        // Clicked outside the child component, close it
        this.showDiv=false;
    }
    }
    public pagiantion(){
      this.loadPosts(this.user.id);
    }
    public publishPost(id:number){
      this.postsService.approvePost(id).subscribe({
        next:()=>{
          alert('post successfully approved')
        },
        error:()=>{
          alert('error');
        }
      })
    }
    public deletePost(id:number):void {
      this.postsService.deletePost(id).subscribe({
        next:()=>{
          alert('delete successfully');
        },
        error:()=>{
          alert('error');
        }
      })
    }
}