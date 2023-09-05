import { Component, OnInit } from '@angular/core';
import { tagApi } from 'src/app/core/http/tag.service';
import { OffsetService } from 'src/app/core/services/pagination.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
})
export class AuthorTagsComponent implements OnInit {
  public tags: any;
  public totalData!: number;
  constructor(
    private readonly Offset: OffsetService,
    private readonly tagApi: tagApi
  ) {}
  ngOnInit(): void {
    this.getTags();
  }

  public getTags() {
    const offset = this.Offset.offset();
    const length = this.Offset.pageSize;
    this.tagApi.getTags(offset, length,undefined).subscribe((respo) => {
      this.totalData = respo.totalLength;
      this.tags = respo.tags;
    });
  }

  public emitPages() {
    this.getTags();
  }
}
