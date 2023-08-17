import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { commentsApi } from 'src/app/core/http/comments.service';

@Component({
  selector: 'app-reported-commnent-view',
  templateUrl: './reported-commnent-view.component.html',
})
export class ReportedCommnentViewComponent {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly commentApi: commentsApi
  ) {}

  comments!: any[];

  ngOnInit(): void {
    this.getReportedComments();
  }

  public getReportedComments() {
    this.route.queryParams.subscribe((params) => {
      const postId = params['postId'];

      if (postId) {
        this.commentApi
          .getCommentsReportedId(postId, 'Reported')
          .subscribe((comments: any) => {
            this.comments = comments;
          });
      }
    });
  }
  public removeComment(commentId: number) {
    if (confirm('Are you sure you want to delete this comment?')) {
      this.commentApi.removeComment(commentId).subscribe(
        (response) => {
          this.getReportedComments();
        },

        (error) => {
        }
      );
    }
  }
}
