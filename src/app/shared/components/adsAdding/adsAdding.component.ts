import { HttpClient } from '@angular/common/http';

import { Component, EventEmitter, Output } from '@angular/core';

import { AdvertisementService } from 'src/app/core/http/advertismentApi.service';

import { MediaApi } from 'src/app/core/http/media.Apiservice';

import { siteSettingApi } from 'src/app/core/http/site-setting.service';
import { environment } from 'src/enviroment/enviroment';

@Component({
  selector: 'app-ads',

  templateUrl: './ads.component.html',
})
export class AdsShareComponent {
  public mediaFilePath: string = `${environment.url}/assets/`;
  public Image: any;

  public Video: any;

  public External: any;

  public themeId: any;

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

  public textBox: boolean = false;

  public gotMediaId!: number;

  // for video

  public showMedias: boolean = true;

  public showDisabled: boolean = true;

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

  ImgPath: string = '';

  vidPath: string = '';

  advertisement: any;

  constructor(
    private advertisementService: AdvertisementService,
    private http: HttpClient,
    private mediaApi: MediaApi,
    private readonly siteApi: siteSettingApi
  ) {}

  @Output() onClick = new EventEmitter();

  ngOnInit(): void {
    this.advertisementService.getSelectedZone().subscribe((zone) => {
      this.selectedZone = zone;
    });

    this.showMedia();

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

  public getMediaType(mediaFormat: string): string {
    if (mediaFormat === 'Advertisement_Video') {
      return 'video';
    } else if (mediaFormat === 'Advertisement_Image') {
      return 'image';
    } else {
      return 'text';
    }
  }

  public showMedia() {
    this.advertisementService.showAdd().subscribe((res) => {
      const index = res.findIndex(
        (data: any) => data.advertisementNo == this.selectedZone
      );

      this.advertisement = res[index];

      console.log(this.advertisement);
    });
  }

  public exitDiv() {
    this.showMedias = false;
  }

  public extDis() {
    this.showDisabled = false;
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

      console.log(this.External);
    });
  }

  public selectImageForUpload(item: any) {
    this.extPic = true;

    this.selectedImage = item;

    this.selectedImageId = item.id;

    console.log(this.selectedImage);
  }

  public selectVideoForUpload(item: any) {
    this.extVid = true;

    this.selectedExtVid = item;

    this.selectedVideoId = item.id;

    console.log(this.selectedExtVid);
  }

  public selectExternalForUpload(item: any) {
    this.extLink = true;

    this.selectedExtLink = item;

    this.selectedLinkId = item.id;
  }

  public divIm() {
    this.showDisabled=false;
    this.divVid = false;

    this.divExt = false;

    this.showMedias = false;

    this.mediaVideo = false;

    this.mediaExternal = false;

    this.divImg = !this.divImg;
  }

  public divVi() {
    this.showDisabled=false;
    this.showMedias = false;

    this.divImg = false;

    this.divExt = false;

    this.divVid = !this.divVid;

    this.mediaImges = false;

    this.mediaExternal = false;
  }

  public divEx() {
    this.showDisabled=false;
    this.showMedias = false;

    this.divImg = false;

    this.divVid = false;

    this.divExt = !this.divExt;

    this.mediaImges = false;

    this.mediaVideo = false;
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
    if (this.selectedZone !== null && this.fileToUpload) {
      const formData = new FormData();

      formData.append('file', this.fileToUpload, this.fileToUpload.name);

      if (this.ImgPath !== '') {
        const link = {
          Path: this.ImgPath,
        };

        formData.append('data', JSON.stringify(link));
      }

      console.log(this.ImgPath);

      //console.log(this.ImgPath)

      console.log(this.fileToUpload.name);

      console.log(formData);

      this.advertisementService
        .postStaticAdvComputer(this.selectedZone, this.imgFormat, formData)

        .subscribe({
          next: (response) => {
            console.log(response);

            this.divImg = false;

            alert(`PhotoAd added for zone ${this.selectedZone}  in theme  `);
          },

          error: (response) => {
            alert('Error updating photoAdd:');
          },
        });
    }
  }

  public uploadExistingImg() {
    if (this.selectedZone !== null) {
      this.advertisementService
        .uploadExistingMedia(this.selectedZone, {
          mediaId: this.selectedImageId,
        })

        .subscribe({
          next: (response) => {
            alert(`PhotoAd added for zone ${this.selectedZone}  in theme  `);

            this.divImg = false;
          },

          error: (response) => {
            alert('Error updating photoAdd:');
          },
        });
    }
  }

  public uploadVid() {
    if (this.selectedZone !== null && this.videoToUpload) {
      const formData = new FormData();

      formData.append('file', this.videoToUpload, this.videoToUpload.name);

      if (this.vidPath !== '') {
        const link = {
          Path: this.vidPath,
        };

        formData.append('data', JSON.stringify(link));
      }

      this.advertisementService
        .postStaticAdvComputer(this.selectedZone, this.vidFormat, formData)

        .subscribe({
          next: (response) => {

            alert(`VideoAd added for zone ${this.selectedZone}  in theme  `);

            this.divVid = false;
          },

          error: (response) => {
            alert('Error updating VideoAdd:');
          },
        });
    }
  }

  public uploadExistingVid() {
    if (this.selectedZone !== null) {
      this.advertisementService
        .uploadExistingMedia(this.selectedZone, {
          mediaId: this.selectedVideoId,
        })

        .subscribe({
          next: (response) => {
            alert(`Video Add added for zone ${this.selectedZone}  in theme  `);

            this.divVid = false;
          },

          error: (response) => {
            alert('Error updating VideoAdd:');
          },
        });
    }
  }

  public uploadExistingLink() {
    if (this.selectedZone !== null) {
      this.advertisementService
        .uploadExistingLink(this.selectedZone, { mediaId: this.selectedLinkId })

        .subscribe({
          next: (response) => {
            alert(
              `External Link Add added for zone ${this.selectedZone}  in theme  `
            );

            this.divExt = false;
          },

          error: (response) => {
            alert('Error updating ExternalLink:');
          },
        });
    }
  }

  public uploadLink() {
    if (this.selectedZone !== null) {
      const formData = {
        path: this.path,
      };
      this.advertisementService
        .postStaticExternalComputer(this.selectedZone, formData)

        .subscribe({
          next: (response) => {
            alert(`New Link added for zone ${this.selectedZone}  in theme  `);

            this.divExt = false;
          },

          error: (response) => {
            alert('Error updating NewLink :');
          },
        });
    }
  }

  public uploadDynamic() {
    if (this.selectedZone !== null) {
      this.advertisementService.uploadDynamic(this.selectedZone).subscribe({
        next: (res) => {
          alert(`Dynamic Ad added for zone ${this.selectedZone}  in theme `);
        },

        error: (response) => {
          alert('Error updating Dynamic Ad');
        },
      });
    }
  }

  public disableAd() {
    if (this.selectedZone !== null)
      this.advertisementService.disableAds(this.selectedZone).subscribe({
        next: (res) => {
          alert(
            `The ad for zone ${this.selectedZone}  is disabled from the theme `
          );
        },

        error: (response) => {
          alert('Error disabling Ad');
        },
      });
  }
}
