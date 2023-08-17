import { Component, OnInit } from '@angular/core';
import { tagApi } from 'src/app/core/http/tag.service';
import { OffsetService } from 'src/app/core/services/pagination.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
})
export class TagsComponent implements OnInit {
  public tags: any;
  public enableSearch: boolean = false;

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
    const input = this.Offset.searchInput();
    console.log(input);
    this.tagApi.getTags(offset, length, input).subscribe((respo) => {
      console.log(respo);

      this.totalData = respo.totalLength;
      this.tags = respo.tags;
    });
  }

  public emitPages() {
    this.getTags();
  }
  public searchPostByName(event: any) {
    console.log(event.target.value);
    this.Offset.toggleInputData(event.target.value);
    this.getTags();
  }
}
