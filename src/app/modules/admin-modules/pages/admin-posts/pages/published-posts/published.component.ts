
import { HttpClient } from "@angular/common/http";
import { Component, ElementRef, OnInit } from "@angular/core";
import { postsAPi } from "src/app/core/http/post.service";
import { OffsetService } from "src/app/core/services/pagination.service";

@Component({
  selector: 'app-post-published',
  templateUrl: './published.component.html',
})
export class PostPublishedComponent implements OnInit {
  commentDiv: boolean=false;
 
constructor(private readonly postsService: postsAPi,
  private readonly toggleOffset: OffsetService
,
  private readonly elementRef:ElementRef){}
public posts:any;
public viewPost:any;
public showDiv:boolean=true;
public listIndex!:number;
public totalData!:number;
ngOnInit() {
  this.loadPosts();
 
}
public loadPosts(){
  const offset = this.toggleOffset.offset();

  this.postsService.getFilteredPosts('Active',offset, this.toggleOffset.pageSize).subscribe({
    next:(response)=>{
        this.posts = response;
        this.totalData=response.totalLength;
    }
 })
}
public toggleEditMenu(data:any,index:number){
   
    this.listIndex=index;
this.showDiv=!this.showDiv;
}

  public showBox(index:number) {
    this.commentDiv = true;
    this.viewPost=this.posts[index];
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
    this.loadPosts();
  }
}
