import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { categoryApi } from './core/http/category.service';
import { commentsApi } from './core/http/comments.service';
import { postsAPi } from './core/http/post.service';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule,ReactiveFormsModule],
  providers: [postsAPi,commentsApi,categoryApi],
  bootstrap: [AppComponent],
})
export class AppModule {}
