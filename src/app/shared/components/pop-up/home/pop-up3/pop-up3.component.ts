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
  selector: 'app-pop-up3',
  templateUrl: './pop-up3.component.html',
  animations: [
    trigger('slideFromBottom', [
      state('void', style({ transform: 'translateY(100%)', opacity: 0 })), // Initial state (hidden)
      state('*', style({ transform: 'translateY(0)', opacity: 1 })), // Final state (visible)
      transition('void => *', animate('800ms ease-in')), // Animation when element appears
      transition('* => void', animate('800ms ease-out')), // Animation when element disappears
    ]),
  ],
})
export class PopUp3Component {
  public shoePopPu: boolean = true;
}
