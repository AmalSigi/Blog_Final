import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SharedModelComponent } from './components/shared-model/shared-model.component';
import { FormatLinksPipe } from './pipes/LinkFormating.pipe';
import { PaginationComponent } from './components/pagination/pagination.component';
import { LoadingComponent } from './components/loadingPage/loading.component';
import { RouterModule } from '@angular/router';
import { UserRoutingModule } from '../modules/user-modules/user-routing.module';
import { MessageViewComponent } from './components/message-view/messages.component';
import { PopUp1Component } from './components/pop-up/content/pop-up1/pop-up1.component';
import { PopUp2Component } from './components/pop-up/content/pop-up2/pop-up2.component';
import { PopUp3Component } from './components/pop-up/home/pop-up3/pop-up3.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SharedModelComponent,
    FormatLinksPipe,
    PaginationComponent,
    LoadingComponent,
    MessageViewComponent,
    PopUp1Component,
    PopUp2Component,
    PopUp3Component,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MarkdownModule,
    UserRoutingModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SharedModelComponent,
    FormatLinksPipe,
    PaginationComponent,
    LoadingComponent,
    MessageViewComponent,
    PopUp1Component,
    PopUp2Component,
    PopUp3Component,
  ],
})
export class SharedModule {}
