import { Component } from '@angular/core';
import { AdvertisementService } from 'src/app/core/http/advertismentApi.service';
import { MediaApi } from 'src/app/core/http/media.Apiservice';

@Component({
  selector: 'app-list',
  templateUrl: './adsList.component.html',
})
export class AdsListComponent {
  constructor(
    private readonly mediaApi: MediaApi,
    private readonly advertisementService: AdvertisementService
  ) {}
  mediaItems: any[] = [];
  isAdmediaPath: boolean = false;
  mediaPath: string = '';
  newPath: string = '';

  selectedId!: number;
  ngOnInit() {
    this.showMedia();
  }
  public showMedia() {
    this.advertisementService.showAdd().subscribe((res) => {
      const filtered = res.filter(
        (res: any) => res.advertisementLife !== 'Disabled'
      );
      //const index=res.findIndex((data:any)=>data.advertisementNo == this.selectedZone);
      this.mediaItems = filtered;

      console.log(this.mediaItems);
    });
  }

  public getMediaType(mediaFormat: string): string {
    if (mediaFormat === 'Advertisement_Video') {
      return 'video';
    } else if (mediaFormat === 'Advertisement_Image') {
      return 'image';
    } else {
      return 'text';
    }
  }
  public openResetPath(item: any) {
    this.selectedId = item.media.id;

    //   console.log(this.selectedId)
    this.isAdmediaPath = true;
    this.mediaPath = item?.media?.redirectTo;
    //  console.log(this.mediaPath)
  }

  public addPath() {
    const formData = {
      Path: this.newPath,
    };
    this.mediaApi.patchMediaId(this.selectedId, formData).subscribe({
      next: (res) => {
        // console.log(res);
        this.isAdmediaPath = false;
        this.showMedia();
        this.newPath = '';
      },
      error: (err) => console.log('ERROR', err),
    });
  }
}
