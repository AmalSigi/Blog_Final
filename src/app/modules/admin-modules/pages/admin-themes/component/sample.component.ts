import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { siteSettingApi } from 'src/app/core/http/site-setting.service';
import { themeApi } from 'src/app/core/http/themes.services';
import { environment } from 'src/enviroment/enviroment';

@Component({
  selector: 'app-samplePage',
  templateUrl: './sample.component.html',
})
export class SamplePageComponent implements OnInit {
  constructor(
    private readonly siteSettingsApi: siteSettingApi,
    private readonly toster: ToastrService
  ) {}
  public mediaFilePath: string = `${environment.url}/assets/`;
  @Input() data: any;
  @Output() onChange = new EventEmitter();
  ngOnInit(): void {
    console.log(this.data);
  }
  public closeSample() {
    this.onChange.emit();
  }
  public applyTheme() {
    const body = { themeId: this.data.id };
    this.siteSettingsApi.updateCurrentTheme(body).subscribe({
      next: () => {
        this.toster.success('New theme add Succcessfully');
        this.closeSample();
      },
      error: () => {
        alert('There was an error, please try again');
      },
    });
  }
}
