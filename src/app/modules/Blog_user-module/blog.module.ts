import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { authenticationApi } from 'src/app/core/http/authentication.service';
import { BlogComponent } from './root/blog.component';
import { blogRoutingModule } from './blog-routing.module';
import { ThemeResolver } from 'src/app/core/quards/userRoute.quards';

@NgModule({
  declarations: [BlogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    blogRoutingModule,
    HttpClientModule,
  ],
  providers: [authenticationApi,ThemeResolver],
})
export class blogModule {}
