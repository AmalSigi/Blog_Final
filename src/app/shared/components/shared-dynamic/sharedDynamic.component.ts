import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { AdvertisementService } from 'src/app/core/http/advertismentApi.service';
import { MediaApi } from 'src/app/core/http/media.Apiservice';
import { siteSettingApi } from 'src/app/core/http/site-setting.service';
import { environment } from 'src/enviroment/enviroment';
@Component({
  selector: 'app-shareDynamic',
  templateUrl: './sharedDynamic.component.html',
})
export class SharedDynamicComponent {
  Image: any;
  Video: any;
  External: any;
  themeId: any;
  public mediaImges: boolean = false;
  public mediaVideo: boolean = false;
  public mediaExternal: boolean = false;
  public selectedImage: any = null;
  public divImg: boolean = false;
  public divVid: boolean = false;
  public divExt: boolean = false;
  public extPic: boolean = false;
  selectedZone: number | null = null;
  public fileToUpload!: File;
  public picUpload: boolean = false;
  public selectedPic!: any;
  selectedImageId: any;
  public imgFormat: string = 'Advertisement_Image';
  public mediaFilePath: string = `${environment.url}/assets/`;
  // for video

  public selectedVid: any;
  public selectedExtVid: any;
  public videoToUpload!: File;
  public vidUpload: boolean = false;
  public selectedVideoId: any;
  public extVid: boolean = false;
  public vidFormat: string = 'Advertisement_Video';

  //for externalLinks

  public linkUpload: boolean = false;
  public extLink: boolean = false;
  public selectedExtLink: any;
  public selectedLinkId: any;
  path: string = '';
  constructor(
    private advertisementService: AdvertisementService,
    private http: HttpClient,
    private readonly mediaApi: MediaApi,
    private readonly siteApi: siteSettingApi
  ) {}
  @Output() onClick = new EventEmitter();
  ngOnInit(): void {
    this.advertisementService.getSelectedZone().subscribe((zone) => {
      this.selectedZone = zone;
    });
    this.photoAdv();
    this.videoAdv();
    this.externalAdv();

    this.siteApi.getSiteSetting().subscribe((data: any) => {
      const currentThemeSettings = data.find(
        (setting: any) => setting.settingName === 'currentTheme'
      );
      if (currentThemeSettings) {
        this.themeId = +currentThemeSettings.settingValue;
      } else {
      }
    });
  }
  public photoAdv() {
    this.mediaApi.fetchImage().subscribe((data) => {
      this.Image = data;
    });
  }
  public videoAdv() {
    this.mediaApi.fetchVideo().subscribe((data: any) => {
      this.Video = data;
    });
  }
  public externalAdv() {
    this.mediaApi.fetchExternal().subscribe((data: any) => {
      this.External = data;
    });
  }
  public selectImageForUpload(item: any) {
    this.extPic = true;
    this.selectedImage = item;
    this.selectedImageId = item.id;
  }
  public selectVideoForUpload(item: any) {
    this.extVid = true;
    this.selectedExtVid = item;

    this.selectedVideoId = item.id;
  }
  public selectExternalForUpload(item: any) {
    this.extLink = true;
    this.selectedExtLink = item;

    this.selectedLinkId = item.id;
  }
  public divIm() {
    this.divVid = false;
    this.divExt = false;
    this.divImg = !this.divImg;
  }
  public divVi() {
    this.divImg = false;
    this.divExt = false;
    this.divVid = !this.divVid;
  }
  public divEx() {
    this.divImg = false;
    this.divVid = false;
    this.divExt = !this.divExt;
  }

  public mediaImg() {
    this.picUpload = false;
    this.mediaImges = !this.mediaImges;
  }
  public mediaVid() {
    this.vidUpload = false;
    this.mediaVideo = !this.mediaVideo;
  }
  public mediaEx() {
    this.linkUpload = false;
    this.mediaExternal = !this.mediaExternal;
  }
  public selectFromComputer() {
    this.extPic = false;
    this.picUpload = !this.picUpload;
  }
  public selectVideoFromComputer() {
    this.extVid = false;
    this.vidUpload = !this.vidUpload;
  }
  public typeExternalLink() {
    this.extLink = false;
    this.linkUpload = !this.linkUpload;
  }
  public unshowBox() {
    this.onClick.emit();
  }
  public fileImport(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.fileToUpload = fileList[0];
      this.picUpload = false;
      const pic = new FileReader();
      pic.readAsDataURL(this.fileToUpload);
      pic.onload = () => {
        this.selectedPic = pic.result;
      };
    }
  }
  public fileVideoImport(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.videoToUpload = fileList[0];
      this.picUpload = false;
      const vid = new FileReader();
      vid.readAsDataURL(this.videoToUpload);
      vid.onload = () => {
        this.selectedVid = vid.result;
      };
    }
  }
  public uploadImg() {
    if (this.fileToUpload) {
      const formData = new FormData();

      formData.append('file', this.fileToUpload, this.fileToUpload.name);

      this.advertisementService
        .addNewMedia(this.imgFormat, formData)
        .subscribe({
          next: (response) => {
            this.photoAdv();
            alert(`Photo Added to DynamicAd List  `);
            this.divImg = false;
          },
          error: (response) => {
            alert('Error updating photo');
          },
        });
    }
  }
  public uploadExistingImg() {
    this.advertisementService
      .addExistingMedia({ mediaId: this.selectedImageId })
      .subscribe({
        next: (response) => {
          alert(`Photo added to dynamicAd List  `);
          this.divImg = false;
        },
        error: (response) => {
          alert('Error updating Photo to dynamicAd List');
        },
      });
  }
  public uploadVid() {
    if (this.videoToUpload) {
      const formData = new FormData();

      formData.append('file', this.videoToUpload, this.videoToUpload.name);

      this.advertisementService
        .addNewMedia(this.vidFormat, formData)
        .subscribe({
          next: (response) => {
            this.videoAdv();

            alert(`Video added to dynamicAdd List  `);
            this.divVid = false;
          },
          error: (response) => {
            alert('Error updating Video to DynamicAd List');
          },
        });
    }
  }
  public uploadExistingVid() {
    this.advertisementService
      .addExistingMedia({ mediaId: this.selectedVideoId })
      .subscribe({
        next: (response) => {
          alert(`Video added to DynamicAd List `);
          this.divVid = false;
        },
        error: (response) => {
          alert('Error updating Video');
        },
      });
  }

  public uploadExistingLink() {
    this.http
      .post(`http://192.168.29.97:5296/api/Theme/dynamicList/existingMedia`, {
        mediaId: this.selectedLinkId,
      })
      .subscribe({
        next: (response) => {
          alert(`External Link  added to DynamicAd List  `);
          this.divExt = false;
        },
        error: (response) => {
          alert(response.error);
        },
      });
  }
  public uploadLink() {
    const formData = {
      path: this.path,
    };
    this.advertisementService.addLink(formData).subscribe({
      next: (response) => {
        this.externalAdv();
        alert(`New Link added to dynamicAd List  `);
        this.divExt = false;
      },
      error: (response) => {
        alert('Error uploading NewLink :');
      },
    });
  }
}
