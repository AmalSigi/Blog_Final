import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { UserRoutingModule } from '../modules/user-modules/user-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoadingComponent } from './components/loadingPage/loading.component';
import { MessageViewComponent } from './components/message-view/messages.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PopUp1Component } from './components/pop-up/content/pop-up1/pop-up1.component';
import { PopUp2Component } from './components/pop-up/content/pop-up2/pop-up2.component';
import { PopUp3Component } from './components/pop-up/home/pop-up3/pop-up3.component';
import { SharedModelComponent } from './components/shared-model/shared-model.component';
import { FormatLinksPipe } from './pipes/LinkFormating.pipe';
import { AdsShareComponent } from './components/adsAdding/adsAdding.component';
import { SharedDynamicComponent } from './components/shared-dynamic/sharedDynamic.component';
import { AppAdvertisementViewComponent } from './components/advertisment-view/adview.component';
import { PopUp4Component } from './components/pop-up/home/pop-up4/pop-up4.component';
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
    AdsShareComponent,
    SharedDynamicComponent,
    AppAdvertisementViewComponent,
    PopUp4Component,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MarkdownModule,
    UserRoutingModule,
    HttpClientModule,
    FormsModule,
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
    PopUp4Component,
    AdsShareComponent,
    SharedDynamicComponent,
    AppAdvertisementViewComponent,
  ],
})
export class SharedModule {}
