
import { HttpClient } from "@angular/common/http";
import { Component, ElementRef, OnInit } from "@angular/core";
import { postsAPi } from "src/app/core/http/post.service";

@Component({
  selector: 'app-post-published',
  templateUrl: './published.component.html',
})
export class PostPublishedComponent implements OnInit {
  commentDiv: boolean=false;
 
constructor(private readonly postsService: postsAPi,
  private readonly elementRef:ElementRef){}
public posts:any;
public viewPost:any;
public showDiv:boolean=true;
public listIndex!:number;
ngOnInit() {
  this.loadPosts();
 
}
public loadPosts(){
  this.postsService.getPosts().subscribe({
    next:(response)=>{
console.log(response);

        this.posts = response.filter((post:any)=>post.postStatus=='Active');
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
}
