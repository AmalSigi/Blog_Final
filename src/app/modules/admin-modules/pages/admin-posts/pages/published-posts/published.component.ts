import { Component, OnInit } from '@angular/core';
import { postData } from 'src/app/core/services/posts.services';

@Component({
  selector: 'app-post-published',
  templateUrl: './published.component.html',
})
export class PostPublishedComponent implements OnInit {
  constructor(private readonly postsService: postData) {}
  public posts: any;
  public showDiv: boolean = false;
  public commentDiv: boolean = false;
  public listIndex!: number;
  ngOnInit() {
    this.posts = this.postsService.postData;
    console.log(this.posts);
  }
  public toggleEditMenu(data: any, index: number) {
    this.listIndex = index;
    this.showDiv = !this.showDiv;
  }

  public showBox() {
    this.commentDiv = true;
  }
  public unshowBox() {
    this.commentDiv = false;
  }
}
