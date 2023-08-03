
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { postsAPi } from "src/app/core/http/post.service";

@Component({
    selector: "app-post-published",
        templateUrl: "./published.component.html",
        
})
export class PostPublishedComponent implements OnInit {
constructor(private readonly postsService: postsAPi){}
public posts:any;
public showDiv:boolean=true;
public listIndex!:number;
ngOnInit() {
 this.postsService.getPosts().subscribe({
    next:(response)=>{
console.log(response);

        this.posts = response;
    }
 })
}
public toggleEditMenu(data:any,index:number){
   
    this.listIndex=index;
this.showDiv=!this.showDiv;
}

}