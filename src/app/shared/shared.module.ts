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

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SharedModelComponent,
    FormatLinksPipe,
    PaginationComponent,
    LoadingComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, MarkdownModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    SharedModelComponent,
    FormatLinksPipe,
    PaginationComponent,
    LoadingComponent
  ],
})
export class SharedModule {}
