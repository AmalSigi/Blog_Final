import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
} from '@angular/animations';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { siteSettingApi } from 'src/app/core/http/site-setting.service';

@Component({
  selector: 'app-pop-up2',
  templateUrl: './pop-up2.component.html',
  animations: [
    trigger('fadeInOutSlideFromLeftWithDelay', [
      state('void', style({ opacity: 0, transform: 'translateX(100%)' })), // Initial state (hidden, off to the left)
      state('*', style({ opacity: 1, transform: 'translateX(0)' })), // Final state (visible, in its normal position)
      transition('void => *', [
        animate('10000ms', style({ transform: 'translateX(100%)' })), // Delayed start (off to the right)
        animate('1500ms', style({ transform: 'translateX(0)', opacity: 1 })), // Sliding and fading animation
      ]),
      transition('* => void', [
        animate('1500ms', style({ transform: 'translateX(100%)', opacity: 0 })), // Sliding and fading animation
      ]),
    ]),
  ],
})
export class PopUp2Component {
  @Input() theme!: number;
  public showPopUp!: boolean;
  constructor(private readonly router: Router,private readonly siteSettings:siteSettingApi) {}
  ngOninit(): void {
    this.getSetting()
   }
   
    public getSetting() {
   
       this.siteSettings.getSiteSetting().subscribe((respo: any) => {
   
         let popUp = respo.find((item: any) => item.id == 9);
   
         this.showPopUp = popUp.settingValue;
   
       });
   
     }
  public contact() {
    this.showPopUp = false;
    if (this.theme == 1) {
      this.router.navigate(['/contact']);
    } else {
      this.router.navigate(['/Theme2/contact']);
    }
  }
}
