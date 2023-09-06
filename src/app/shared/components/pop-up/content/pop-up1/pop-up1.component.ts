import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
} from '@angular/animations';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pop-up1',
  templateUrl: './pop-up1.component.html',
  animations: [
    trigger('slideInAndOutFromLeftWithDelay', [
      state('void', style({ opacity: 0, transform: 'translateX(-100%)' })), // Initial state (hidden, off to the left)
      state('*', style({ opacity: 1, transform: 'translateX(0)' })), // Final state (visible, in its normal position)
      transition('void => *', [
        animate('2000ms ease-in', style({ transform: 'translateX(-100%)' })), // Delayed start (off to the left)
        animate(
          '1500ms ease-in',
          style({ transform: 'translateX(0)', opacity: 1 })
        ), // Sliding and fading animation
      ]),
      transition('* => void', [
        animate(
          '1500ms ease-out',
          style({ transform: 'translateX(-100%)', opacity: 0 })
        ), // Sliding and fading out animation
      ]),
    ]),
  ],
})
export class PopUp1Component {
  public shoePopPu: boolean = true;
  constructor(private readonly route: ActivatedRoute) {}
}
