import { Component, OnInit } from '@angular/core';
import { postsAPi } from 'src/app/core/http/post.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
})
export class CommentsComponent implements OnInit {
  public commentDiv: boolean = false;
  public post: any;
  public postInv: any;
  constructor(private readonly allPosts: postsAPi) {}
  ngOnInit(): void {
    this.allPosts.getPosts().subscribe((repo) => {
      this.post = repo;
    });
  }
  public showBox(postInv: any) {
    this.postInv = postInv;
    this.commentDiv = true;
  }
  public unshowBox() {
    this.commentDiv = false;
  }
}
