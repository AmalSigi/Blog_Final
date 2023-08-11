import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    comment: new FormControl('', Validators.required),
    _ParentId: new FormControl('', Validators.required),
    _AuthorId: new FormControl(3, Validators.required),
  });
  ngOnInit(): void {
    this.getComments();
    this.getPost();
  }

  public getPost() {
    this.post.postSections = this.post.postSections.sort(
      (itemA: { sequenceNo: number }, itemB: { sequenceNo: number }) =>
        itemA.sequenceNo - itemB.sequenceNo
    );
  }

  public getComments() {
    this.commentsApi.getAllCommentsByPost(this.post.id).subscribe((repo) => {
      this.comments = repo;
    });
  }
  public unshowBox() {
    this.onClick.emit();
  }

  //reply comments
  public replyBox(comment: any) {
    this.replayInputBox = true;
    this.parentCommentAuthor = `@${comment.author.firstName}`;
    this.parentId = comment.id;
  }
  public sendReply() {
    this.commentForm.controls['_ParentId'].setValue(this.parentId);
    this.commentsApi
      .postComment(this.post.id, this.commentForm.value)
      .subscribe((_repo) => {});
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
    });
  }

  public delectComment(commentId: number) {
    console.log(commentId);
    this.commentsApi.removeComment(commentId).subscribe((respo) => {});
  }
}
