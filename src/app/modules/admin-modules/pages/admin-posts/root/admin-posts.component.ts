import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { postsAPi } from 'src/app/core/http/post.service';
import { trackDataService } from 'src/app/core/subjects/trackData.subject';

@Component({
  selector: 'app-admin-posts',
  templateUrl: './admin-posts.component.html',
})
export class AdminPostsComponent {
  constructor(
    private readonly postApi: postsAPi,
    private readonly trackCountService: trackDataService
  ) {}
  public publishCount: number = 0;
  public draftCount: number = 0;
  public trashCount: number = 0;
  public trackCount: Subscription = this.trackCountService
    .getClickEvent1()
    .subscribe(() => {
      this.getdataCount();
    });
  ngOnInit() {
    this.getdataCount();
  }
  public getdataCount(): void {
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
