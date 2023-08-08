import { Component } from '@angular/core';
import { postsAPi } from 'src/app/core/http/post.service';
import { OffsetService } from 'src/app/core/services/pagination.service';

@Component({
  selector: 'app-post-draft',
  templateUrl: './draft.component.html',
})
export class PostDraftComponent {
  constructor(
    private readonly postsService: postsAPi,
    private readonly toggleOffset: OffsetService
  ) {}
  public posts: any;
  public pageLength: number = 6;
  public offsetValue: number = 0;
  ngOnInit() {
    this.loadPosts();
    console.log('hi')
  }
  public loadPosts() {
    const offset = this.toggleOffset.offset();
    this.postsService
      .getFilteredPosts('Draft', offset, this.pageLength)
      .subscribe({
        next: (response) => {
          this.posts = response;
        },
      });
  }
  public pagiantion(){
    this.loadPosts();
  }
}

