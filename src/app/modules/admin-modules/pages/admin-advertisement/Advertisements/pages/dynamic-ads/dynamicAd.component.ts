import { HttpClient } from "@angular/common/http";
import { Component, EventEmitter, Output } from "@angular/core";
import { AdvertisementService } from "src/app/core/http/advertismentApi.service";

@Component({
    selector:'app-dynamic',
    templateUrl:'./dynamicAd.component.html'
})
export class  DynamicAdComponent{
  constructor(private http:HttpClient,private readonly advertisementService:AdvertisementService){}
    public openModal:boolean=false;
    mediaItems: any[] = [];

    public openAd(){
      
        this.openModal = true;



    }
ngOnInit(){
    this.getMedia();
}

    public getMedia(){
        this.advertisementService.getDynamicList()
        .subscribe((data: any) => {
          this.mediaItems = data.advertisements;
        });
    }
   
    public getMediaType(mediaFormat:string):string{
        if (mediaFormat === 'Advertisement_Video') {
            return 'video';
          } else if (mediaFormat === 'Advertisement_Image') {
            return 'image';
          } else {
            return 'text';
          }
        }

     public deleteMedia(listId:number){
        this.advertisementService.deleteDynamic(listId).subscribe({
            next:(response)=>{
                this.getMedia();
                alert(`Successfully removed dynamicAd with id ${listId}`)
            },
            error: (response) => {
                alert('Error deleting dynamicAd');
              },
            
        })
     }   
    }
