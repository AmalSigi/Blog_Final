import { Component } from '@angular/core';
import { postsAPi } from 'src/app/core/http/post.service';

@Component({
  selector: 'app-admin-posts',
  templateUrl: './admin-posts.component.html',
})
export class AdminPostsComponent {
  constructor(private readonly postApi: postsAPi) {}
  public publishCount: number = 0;
  public draftCount: number = 0;
  public trashCount: number = 0;
  ngOnInit() {
    this.postApi.getPosts().subscribe({
      next: (res) => {
        this.draftCount = res?.posts.filter(
          (item: any) => item.postStatus == 'Draft'
        ).length;
        this.publishCount = res?.posts.filter(
          (item: any) => item.postStatus == 'Active'
        ).length;
        this.trashCount = res?.posts.filter(
          (item: any) => item.postStatus == 'Deleted'
        ).length;
      },
    });
  }
}
