import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { commentsApi } from 'src/app/core/http/comments.service';

@Component({
  selector: 'app-reported-commnent-view',
  templateUrl: './reported-commnent-view.component.html',
})
export class ReportedCommnentViewComponent {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly commentApi: commentsApi,
    private readonly toster: ToastrService
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
            console.log(comments);
            this.comments = comments;
          });
      }
    });
  }
  public removeComment(commentId: number) {
    if (confirm('Are you sure you want to delete this comment?')) {
      this.commentApi.removeCommentdeletePermanently(commentId).subscribe({
        next: (response) => {
          this.toster.success('Comment has removed From then Post');
          this.getReportedComments();
        },
        error: (error) => {
          this.toster.error(error);
        },
      });
    }
  }
}
