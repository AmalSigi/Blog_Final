import { Component, OnInit } from '@angular/core';
import { tagApi } from 'src/app/core/http/tag.service';
import { postData } from 'src/app/core/services/posts.services';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
})
export class TagsComponent implements OnInit {
  public tags: any;
  constructor(
    private readonly randTags: postData,
    private readonly tagApi: tagApi
  ) {}
  ngOnInit(): void {
    this.getTags();
  }

  public getTags() {
    this.tagApi.getTags().subscribe((respo) => {
      console.log(respo);
      this.tags = respo;
    });
  }
}
