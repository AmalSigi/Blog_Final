import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { commentsApi } from 'src/app/core/http/comments.service';

@Component({
  selector: 'author-shared-model',

  templateUrl: './shared.component.html',
})
export class AuthorSharedModelComponent implements OnInit {
  @Output() onClick = new EventEmitter();

  @Input() post: any;

  public commentDiv: boolean = false;

  public replayInputBox: boolean = false;

  public viewReplyComments: boolean = false;

  public parentCommentAuthor: string = '';

  public parentId: any;

  public comments: any;

  public commentboxId: any;

  public replayCommentData: any = [];

  public toggleReply: boolean = false;

  constructor(private readonly commentsApi: commentsApi) {}

  public commentForm = new FormGroup({
    content: new FormControl('', Validators.required),

    ParentId: new FormControl('', Validators.required),

    AuthorId: new FormControl(3, Validators.required),
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
    this.commentsApi

      .getAllCommentsByPostAuthor(this.post.id)

      .subscribe((repo) => {
        this.comments = this.getParentsWithChildComments(repo);
      });
  }

  public getParentsWithChildComments(comments: any[]): any[][] {
    let parentComments = comments.filter((c) => c.parentId == null);

    let listOfParentsWithChildren: any[][] = [];

    for (const comment of parentComments) {
      let parentWithChild: any[] = [];

      getallchildren(comment);

      listOfParentsWithChildren.push(parentWithChild);

      function getallchildren(parent: any) {
        parentWithChild.push(parent);

        for (const comment of comments) {
          if (comment.parentId == parent.id) {
            getallchildren(comment);
          }
        }
      }
    }

    return listOfParentsWithChildren;
  }

  public unshowBox() {
    this.onClick.emit();
  }

  //reply comments

  public replyBox(comment: any) {
    this.replayInputBox = true;

    this.toggleReply = true;

    this.parentCommentAuthor = `@${comment.author.firstName}`;

    if (comment.id != this.parentId) {
      this.parentId = comment.id;
    }
  }

  public closeReplyTag() {
    this.toggleReply = false;

    this.parentCommentAuthor = '';
  }

  public sendReply() {
    this.commentForm.controls['ParentId'].setValue(this.parentId);

    console.log(this.commentForm.value);

    this.commentsApi

      .postComment(this.post.id, this.commentForm.value)

      .subscribe((_repo) => {
        this.getComments();

        this.commentForm.reset();

        this.toggleReply = false;

        this.parentId = null;

        this.commentboxId = -1;

        this.viewReplyComments = false;
      });
  }

  // view replyComment

  public viewReplyBox(id: any, comment: any) {
    if (this.commentboxId == id) {
      this.viewReplyComments = false;

      this.replayInputBox = false;

      this.commentboxId = -1;
    } else {
      this.viewReplyComments = true;

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
}
