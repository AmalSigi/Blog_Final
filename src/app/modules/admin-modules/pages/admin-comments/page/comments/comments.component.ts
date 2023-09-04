import { Component, OnInit } from '@angular/core';

import { combineLatest } from 'rxjs';

import { commentsApi } from 'src/app/core/http/comments.service';

import { postsAPi } from 'src/app/core/http/post.service';

import { OffsetService } from 'src/app/core/services/pagination.service';

@Component({
  selector: 'app-comments',

  templateUrl: './comments.component.html',
})
export class CommentsComponent implements OnInit {
  public commentDiv: boolean = false;

  public post: any;

  public postInv: any;

  public currentPage: number = 1;

  public totalData!: number;

  public totalLength: number = 0;

  // public postsWithComments: any

  constructor(
    private readonly allPosts: postsAPi,
    private readonly commentApi: commentsApi,
    private offsetService: OffsetService
  ) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  public fetchPosts() {
    const offset = this.offsetService.offset();

    const length = this.offsetService.pageSize;

    const status = '';

    this.allPosts.postHasComment(status, length, offset).subscribe((repo) => {
      const posts = repo.posts;

      const fetchCommentCounts = posts.map((post: any) => {
        return this.commentApi.getCommentsCount(post.id, status);
      });

      combineLatest(fetchCommentCounts).subscribe((commentCounts: any) => {
        this.post = posts.filter((post: any, index: number) => {
          const commentCount = commentCounts[index].count;

          post.totalLength = commentCount;

          return commentCount > 0;
        });

        this.totalLength = repo.totalLength;
      });
    });
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
