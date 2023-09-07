import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
    private readonly tagApi: tagApi,
    private readonly toster: ToastrService
  ) {}
  ngOnInit(): void {
    this.getTags();
  }

  public getTags() {
    const offset = this.Offset.offset();
    const length = this.Offset.pageSize;
    const input = this.Offset.searchInput();

    this.tagApi.getTags(offset, length, input).subscribe((respo) => {
      this.totalData = respo.totalLength;
      this.tags = respo.tags;
    });
  }

  public emitPages() {
    this.getTags();
  }

  public deleteTag(tag: any) {
    this.tagApi.deletTag(tag.id).subscribe({
      next: () => {
        this.toster.success(`Tag ${tag.tagName} is Deleteed`);
        this.getTags();
      },
    });
  }
  public searchPostByName(event: any) {
    this.Offset.toggleInputData(event.target.value);
    this.getTags();
  }
}
