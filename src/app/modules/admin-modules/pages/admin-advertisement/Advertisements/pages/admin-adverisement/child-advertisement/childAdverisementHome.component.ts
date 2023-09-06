import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { AdvertisementService } from "src/app/core/http/advertismentApi.service";

@Component({
    selector:'app-childHome',
    templateUrl:'./childAdvertisementHome.component.html'
})
export class AdverisementHomeComponent{
    constructor(private advertisementService: AdvertisementService,private http:HttpClient) {}
  public openImage:boolean=false;
    public openModal:boolean=false;

    public openAd(zone: number){
        this.advertisementService.setSelectedZone(zone);
        this.openModal = true;



    }

  
}