import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { categoryApi } from './core/http/category.service';
import { commentsApi } from './core/http/comments.service';
import { postsAPi } from './core/http/post.service';
import { SharedModule } from './shared/shared.module';
import { MarkdownModule } from 'ngx-markdown';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/Interceptor/token.interceptor';
import { selectTheme } from './core/services/selectTheme.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxCaptchaModule } from 'ngx-captcha';
import { RecaptchaModule } from 'ng-recaptcha';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MarkdownModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxCaptchaModule,
    RecaptchaModule,
    FormsModule,
    EditorModule,
  ],

  providers: [
    postsAPi,
    commentsApi,
    categoryApi,
    selectTheme,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
