import { Component } from '@angular/core';
import { postData } from 'src/app/core/services/posts.services';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
})
export class AdminHomeComponent {
  constructor(private readonly postData: postData) {}
  posts: any;
  ngOnInit(): void {
    this.posts = this.postData.postData;
    console.log(this.posts);
  }
}
