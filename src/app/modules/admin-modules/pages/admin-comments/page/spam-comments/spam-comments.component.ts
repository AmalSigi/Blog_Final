import { Component } from '@angular/core';
import { postData } from 'src/app/core/services/posts.services';

@Component({
  selector: 'app-spam-comments',
  templateUrl: './spam-comments.component.html',
})
export class SpamCommentsComponent {
  public post: any;
  constructor(private readonly postData: postData) {
    this.post = this.postData.postData;
  }
}
