import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { elementAt } from 'rxjs';
import { commentsApi } from 'src/app/core/http/comments.service';

@Component({
  selector: 'app-shared-model',
  templateUrl: './shared-model.component.html',
})
export class SharedModelComponent implements OnInit {
  @Output() onClick = new EventEmitter();
  @Input() post: any;
  public commentDiv: boolean = false;
  public replayInputBox: boolean = false;
  public viewRelpayComments: boolean = false;
  public parentCommentAuthor: string = 'enter comments';
  public parentId: any;
  public comments: any;
  public commentboxId: any;
  public replayCommentData: any = [];
  constructor(private readonly commentsApi: commentsApi) {}
  public commentForm = new FormGroup({
    content: new FormControl('', Validators.required),
    ParentId: new FormControl('', Validators.required),
    AuthorId: new FormControl(3, Validators.required),
  });
  ngOnInit(): void {
    this.getComments();
    this.getPost();
    console.log(this.post);
  }

  public getPost() {
    this.post.postSections = this.post.postSections.sort(
      (itemA: { sequenceNo: number }, itemB: { sequenceNo: number }) =>
        itemA.sequenceNo - itemB.sequenceNo
    );
  }

  public getComments() {
    this.commentsApi.getAllCommentsByPost(this.post.id).subscribe((repo) => {
      console.log(repo);
      this.comments = repo.comments;
    });
  }
  public unshowBox() {
    this.onClick.emit();
  }

  //reply comments
  public replyBox(comment: any) {
    this.replayInputBox = true;
    this.parentCommentAuthor = `@${comment.author.firstName}`;
    if (comment.id == this.parentId) {
    } else {
      this.parentId = comment.id;
    }
  }
  public sendReply() {
    this.commentForm.controls['ParentId'].setValue(this.parentId);
    this.commentsApi
      .postComment(this.post.id, this.commentForm.value)
      .subscribe((_repo) => {
        this.getComments();
        this.commentForm.reset();
        this.parentCommentAuthor = 'enter comments';
      });
  }

  // view replyComment

  public viewReplyBox(id: any, comment: any) {
    if (this.commentboxId == id) {
      this.viewRelpayComments = false;
      this.replayInputBox = false;
      this.commentboxId = -1;
    } else {
      this.viewRelpayComments = true;
      this.commentboxId = id;
      this.replyComment(comment);
    }
  }

  public replyComment(childComment: any) {
    this.replayCommentData = [];
    for (let comment of childComment) {
      if (comment.parentId != null) {
        this.parentIdFinder(comment.parentId, comment);
      }
    }
  }
  public parentIdFinder(parentId: any, comment: any) {
    this.commentsApi.getSingleComment(parentId).subscribe((repo: any) => {
      comment.parentAuthor = repo.author.firstName;
      this.replayCommentData.push(comment);
      console.log(this.replayCommentData);
    });
  }

  public delectComment(commentId: number) {
    this.commentsApi.removeComment(commentId).subscribe({
      next: (respo) => {
        alert('Comment Deleted');
        this.getComments();
      },
      error: (respo) => {
        alert('Error updating profile picture:');
      },
    });
  }
}
