import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SharedModelComponent } from './components/shared-model/shared-model.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, SharedModelComponent],
  imports: [CommonModule, ReactiveFormsModule,MarkdownModule],
  exports: [HeaderComponent, FooterComponent, SharedModelComponent],
})
export class SharedModule {}
