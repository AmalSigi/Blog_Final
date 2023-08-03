import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { postData } from 'src/app/core/services/posts.services';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
})
export class CommentsComponent implements OnInit {
  public commentDiv: boolean = false;
  public post: any;
  public postInv: any;
  constructor(
    private readonly postData: postData,
    private readonly http: HttpClient
  ) {}
  ngOnInit(): void {
    this.http.get('http://192.168.29.97:5296/Post/all').subscribe((repo) => {
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
