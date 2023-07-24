import { Component, OnInit } from '@angular/core';
import { postData } from 'src/app/core/services/posts.services';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
})
export class TagsComponent implements OnInit {
  public tags: any;
  constructor(private readonly randTags: postData) {}
  ngOnInit(): void {
    this.getTags();
  }

  public getTags() {
    this.tags = this.randTags.Tags;
  }
}
