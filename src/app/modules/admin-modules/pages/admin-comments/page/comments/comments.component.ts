import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { postData } from 'src/app/core/services/posts.services';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
})
export class CommentsComponent {
  public commentDiv: boolean = false;
  public post: any;
  constructor(
    private readonly postData: postData,
    private readonly http: HttpClient
  ) {
    this.post = this.postData.postData;
  }
  public showBox() {
    this.commentDiv = true;
  }
  public unshowBox() {
    this.commentDiv = false;
  }
}
