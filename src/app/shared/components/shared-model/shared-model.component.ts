import { Component, EventEmitter, Output } from '@angular/core';
import { postData } from 'src/app/core/services/posts.services';

@Component({
  selector: 'app-shared-model',
  templateUrl: './shared-model.component.html',
})
export class SharedModelComponent {
  @Output() onClick = new EventEmitter();
  public commentDiv: boolean = false;
  public post: any;
  constructor(private readonly postData: postData) {
    this.post = this.postData.postData;
  }
  public unshowBox() {
    this.onClick.emit();
  }
}
