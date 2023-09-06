import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from 'src/enviroment/enviroment';

@Component({
  selector: 'app-addPostSettings',
  templateUrl: './addPostSettings.component.html',
})
export class AddPostSettingsComponent {
  @Input() height!: string;
  @Input() width!: string;
  @Input() aspectRatio!: string;
  @Input() objectFit!: string;
  @Input() currentSettings!: any[];
  public currentTool: string = 'media';
  @Input() currentBlock!: number;
  @Output() onChange = new EventEmitter();
  @Output() changeSettings = new EventEmitter();
  public imgForm!: FormGroup;
  public images!: any;
  constructor(private readonly http: HttpClient) {}
  @Input() mediaType!: number;
  @Output() sendURL = new EventEmitter();
  public mediaFilePath: string = `${environment.url}/assets/`;
  ngOnInit() {
    this.getFormat();

    this.imgForm = new FormGroup({
      height: new FormControl(
        this.currentSettings[this.findIndex(1)]?.value === ''
          ? null
          : Number(this.currentSettings[this.findIndex(1)]?.value)
      ),
      objectFit: new FormControl(
        this.currentSettings[this.findIndex(7)]?.value
      ),
      width: new FormControl(
        this.currentSettings[this.findIndex(2)]?.value === ''
          ? null
          : Number(this.currentSettings[this.findIndex(2)]?.value)
      ),
      aspectRatio: new FormControl(
        this.currentSettings[this.findIndex(6)]?.value
      ),
      altText: new FormControl(this.currentSettings[this.findIndex(5)]?.value),
      href: new FormControl(this.currentSettings[this.findIndex(4)]?.value),
      font: new FormControl(this.currentSettings[this.findIndex(8)]?.value),
    });
  }
  public getFormat() {
    switch (this.mediaType) {
      case 4:
        this.getMedia('Image');
        break;
      case 5:
        this.getMedia('Video');
        break;
      case 6:
        this.getMedia('Advertisement_Image');
        break;
      case 7:
        this.getMedia('Advertisement_Video');
        break;
      case 8:
        this.getMedia('External');
        break;
    }
  }
  public findIndex(id: number) {
    const index = this.currentSettings.findIndex(
      (item: any) => item.sectionAttributeId == id
    );
    return index;
  }
  public getMedia(type: string) {

    this.http.get(`${environment.url}/Media/${type}`).subscribe((data) => {
      this.images = data;
    });
  }

  public sendImage(image: string): void {
    this.sendURL.emit(image);
    this.currentTool = 'settings';
  }
  public closeModal(): void {
    this.onChange.emit();
  }
  public updateSettings(): void {
    this.changeSettings.emit(this.imgForm.value);
  }
}
