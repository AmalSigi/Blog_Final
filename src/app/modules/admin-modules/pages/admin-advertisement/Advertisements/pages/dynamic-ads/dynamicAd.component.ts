import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { AdvertisementService } from 'src/app/core/http/advertismentApi.service';
import { MediaApi } from 'src/app/core/http/media.Apiservice';
import { environment } from 'src/enviroment/enviroment';
@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamicAd.component.html',
})
export class DynamicAdComponent {
  constructor(
    private http: HttpClient,
    private readonly advertisementService: AdvertisementService,
    private readonly mediaApi: MediaApi
  ) {}
  public openModal: boolean = false;
  public mediaFilePath: string = `${environment.url}/assets/`;
  mediaItems: any[] = [];

  isAdmediaPath: boolean = false;

  mediaPath: string = '';

  newPath: string = '';

  selectedId!: number;

  public openAd() {
    this.openModal = true;
  }
  ngOnInit() {
    this.getMedia();
  }

  public getMedia() {
    this.advertisementService.getDynamicList().subscribe((data: any) => {
      this.mediaItems = data.advertisements;
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

  public deleteMedia(listId: number) {
    this.advertisementService.deleteDynamic(listId).subscribe({
      next: (response) => {
        this.getMedia();
        alert(`Successfully removed dynamicAd with id ${listId}`);
      },
      error: (response) => {
        alert('Error deleting dynamicAd');
      },
    });
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

        this.getMedia();

        this.newPath = '';
      },

      error: (err) => console.log('ERROR', err),
    });
  }
}
