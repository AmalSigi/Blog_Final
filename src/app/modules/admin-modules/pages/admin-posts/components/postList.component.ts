import { Component, ElementRef, Input } from "@angular/core";
import { postsAPi } from "src/app/core/http/post.service";

@Component({
    selector: 'app-postList',
    templateUrl: './postList.component.html'
})
export class PostListComponent{
    commentDiv: boolean=false;
 
    constructor(private readonly postsService: postsAPi,
      private readonly elementRef:ElementRef){}
    // public posts:any;
    public viewPost:any;
    public showDiv:boolean=true;
    public listIndex!:number;
    @Input() posts:any;
    ngOnInit() {
      
    
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