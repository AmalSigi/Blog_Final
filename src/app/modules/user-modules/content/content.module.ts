import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';
import { ContentComponent } from './root/content.component';

@NgModule({
  declarations: [ContentComponent],
  imports: [CommonModule, ContentRoutingModule],
})
export class ContentModule {}
