import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { combineLatest } from 'rxjs';

import { commentsApi } from 'src/app/core/http/comments.service';

import { postsAPi } from 'src/app/core/http/post.service';

import { OffsetService } from 'src/app/core/services/pagination.service';

import { postData } from 'src/app/core/services/posts.services';

@Component({
  selector: 'app-spam-comments',

  templateUrl: './spam-comments.component.html',
})
export class SpamCommentsComponent {
  public commentDiv: boolean = false;

  public post: any;

  public postInv: any;

  public totalLength: number = 0;

  public currentPage: number = 1;

  constructor(
    private readonly allPosts: postsAPi,
    private readonly commentApi: commentsApi,
    private readonly router: Router,
    private offsetService: OffsetService
  ) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  public fetchPosts() {
    const offset = this.offsetService.offset();

    const length = this.offsetService.pageSize;

    const status = 'Active';

    this.allPosts.postHasComment(status, length, offset).subscribe((repo) => {
      const posts = repo.posts;
      console.log(posts)

      const fetchCommentCounts = posts.map((post: any) => {
        return this.commentApi.getCommentsCount(post.id, 'Reported');
      });

      combineLatest(fetchCommentCounts).subscribe((commentCounts: any) => {
 
        this.post = posts.filter(
          (post: { totalLength: any }, index: number) => {
            const commentCount = commentCounts[index].count;

            post.totalLength = commentCount;

            return commentCount > 0;
          }
        );

        this.totalLength = repo.totalLength;
      });
    });
  }

  public openModal(postId: number) {
    this.router.navigate(
      ['admin-comments/spam-comments/reported-comment-view'],
      { queryParams: { postId: postId } }
    );
  }

  public showBox(postInv: any) {
    this.postInv = postInv;

    this.commentDiv = true;
  }

  public unshowBox() {
    this.commentDiv = false;
  }

  public onPageChange() {
    this.fetchPosts();
  }
}
