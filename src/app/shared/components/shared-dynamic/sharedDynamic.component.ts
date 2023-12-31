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
  public mediaFilePath: string = `${environment.url}/assets/`;

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

  ImgPath: string = '';

  vidPath: string = '';

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

        console.log('Theme ID:', this.themeId);
      } else {
        console.log('Setting "currentTheme" not found.');
      }
    });
  }

  public photoAdv() {
    this.mediaApi.fetchImage().subscribe((data) => {
      this.Image = data;

      console.log(this.Image);
    });
  }

  public videoAdv() {
    this.mediaApi.fetchVideo().subscribe((data: any) => {
      this.Video = data;

      console.log(this.Video);
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

    console.log(this.selectedExtLink);
  }

  public divIm() {
    this.divVid = false;

    this.divExt = false;

    this.mediaVideo = false;

    this.mediaExternal = false;

    this.divImg = !this.divImg;
  }

  public divVi() {
    this.divImg = false;

    this.divExt = false;

    this.divVid = !this.divVid;

    this.mediaImges = false;

    this.mediaExternal = false;
  }

  public divEx() {
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

      console.log(this.fileToUpload);

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

      console.log(this.videoToUpload);

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

      if (this.ImgPath !== '') {
        const link = {
          Path: this.ImgPath,
        };

        formData.append('data', JSON.stringify(link));
      }

      console.log(this.ImgPath);

      //console.log(this.fileToUpload.name)

      //console.log(formData)

      this.advertisementService
        .addNewMedia(this.imgFormat, formData)

        .subscribe({
          next: (response) => {
            console.log(response);

            // const formData={

            //   path:this.ImgPath

            //   }

            //   console.log(this.ImgPath)

            //           this.mediaApi.patchMediaId(response.id,formData).subscribe({

            //             next:(data)=>{

            //               console.log(data)

            //             },

            //             error: (data) => {

            //              },

            //           })

            // this.photoAdv();

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
          console.log(response);

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

      if (this.vidPath !== '') {
        const link = {
          Path: this.vidPath,
        };

        formData.append('data', JSON.stringify(link));
      }

      console.log(this.videoToUpload.name);

      console.log(formData);

      this.advertisementService
        .addNewMedia(this.vidFormat, formData)

        .subscribe({
          next: (response) => {
            // const formData={

            //   path:this.vidPath

            //   }

            //           this.mediaApi.patchMediaId(response.id,formData).subscribe({

            //             next:(data)=>{

            //               console.log(data)

            //             },

            //             error: (data) => {

            //              },

            //           })

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
          console.log(response);

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
          console.log({ mediaId: this.selectedLinkId });

          alert(`External Link  added to DynamicAd List  `);

          this.divExt = false;
        },

        error: (response) => {
          console.log({ mediaId: this.selectedLinkId });

          alert(response.error);
        },
      });
  }

  public uploadLink() {
    const formData = {
      path: this.path,
    };

    //   console.log(formData)

    this.advertisementService
      .addLink(formData)

      .subscribe({
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
