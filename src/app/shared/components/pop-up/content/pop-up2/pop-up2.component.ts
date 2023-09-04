import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
} from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pop-up2',
  templateUrl: './pop-up2.component.html',
  animations: [
    trigger('fadeInOutSlideFromLeftWithDelay', [
      state('void', style({ opacity: 0, transform: 'translateX(100%)' })), // Initial state (hidden, off to the left)
      state('*', style({ opacity: 1, transform: 'translateX(0)' })), // Final state (visible, in its normal position)
      transition('void => *', [
        animate('5000ms', style({ transform: 'translateX(100%)' })), // Delayed start (off to the right)
        animate('1500ms', style({ transform: 'translateX(0)', opacity: 1 })), // Sliding and fading animation
      ]),
      transition('* => void', [
        animate('1500ms', style({ transform: 'translateX(100%)', opacity: 0 })), // Sliding and fading animation
      ]),
    ]),
  ],
})
export class PopUp2Component {
  public shoePopPu: boolean = true;
}
