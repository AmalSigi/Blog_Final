import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SharedModelComponent } from './components/shared-model/shared-model.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, SharedModelComponent],
  imports: [CommonModule],
  exports: [HeaderComponent, FooterComponent, SharedModelComponent],
})
export class SharedModule {}
