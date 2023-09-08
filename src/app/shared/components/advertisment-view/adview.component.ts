import { Component, Input, OnInit } from '@angular/core';
import { AdvertisementService } from 'src/app/core/http/advertismentApi.service';
import { environment } from 'src/enviroment/enviroment';
@Component({
  selector: 'app-advertisementView',
  templateUrl: './adview.component.html',
})
export class AppAdvertisementViewComponent implements OnInit {
  public advertisement: any;
  public mediaFilePath: string = `${environment.url}/assets/`;
  @Input() adPosition!: number;
  constructor(private advertisementService: AdvertisementService) {}
  ngOnInit(): void {
    this.advertisementService.getAdvertisement().subscribe({
      next: (res: any) => {
        console.log(res);
        // const data=res.filter((res:any)=>res.advertisementLife!='Disabled');
        const index = res.findIndex(
          (data: any) => data.advertisementNo == this.adPosition
        );
        this.advertisement = res[index];
      },
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
}
