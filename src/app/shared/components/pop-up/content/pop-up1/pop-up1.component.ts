import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
} from '@angular/animations';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  @Input() theme!: number;

  public shoewPopUp: boolean = true;
  constructor(private readonly router: Router) {}

  public contact() {
    this.shoewPopUp = false;
    if (this.theme == 1) {
      this.router.navigate(['/contact']);
    } else {
      this.router.navigate(['/Theme2/contact']);
    }
  }
}
