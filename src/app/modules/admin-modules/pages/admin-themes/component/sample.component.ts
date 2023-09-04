import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { siteSettingApi } from 'src/app/core/http/site-setting.service';
import { themeApi } from 'src/app/core/http/themes.services';

@Component({
  selector: 'app-samplePage',
  templateUrl: './sample.component.html',
})
export class SamplePageComponent {
  constructor(
    private readonly siteSettingsApi: siteSettingApi,
    private readonly toster: ToastrService
  ) {}
  @Input() data: any;
  @Output() onChange = new EventEmitter();
  public closeSample() {
    this.onChange.emit();
  }
  public applyTheme() {
    console.log(this.data);
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
