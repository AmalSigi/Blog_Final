import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
} from '@angular/animations';
import { Component, Input } from '@angular/core';
import { AdvertisementService } from 'src/app/core/http/advertismentApi.service';
import { environment } from 'src/enviroment/enviroment';

@Component({
  selector: 'app-pop-up3',
  templateUrl: './pop-up3.component.html',
  animations: [
    trigger('slideFromBottom', [
      state('void', style({ transform: 'translateY(100%)', opacity: 0 })), // Initial state (hidden)
      state('*', style({ transform: 'translateY(0)', opacity: 1 })), // Final state (visible)
      transition('void => *', animate('800ms ease-in')), // Animation when element appears
      transition('* => void', animate('800ms ease-out')), // Animation when element disappears
    ]),
  ],
})
export class PopUp3Component {
  public advertisement: any;
  public mediaFilePath: string = `${environment.url}/assets/`;
  @Input() adPosition!: number;
  public shoePopPu: boolean = true;

  constructor(private advertisementService: AdvertisementService) {}
  ngOnInit(): void {
    this.advertisementService.getAdvertisement().subscribe({
      next: (res: any) => {
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
