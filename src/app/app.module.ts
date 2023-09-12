import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxCaptchaModule } from 'ngx-captcha';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { RecaptchaModule } from 'ng-recaptcha';
import { MarkdownModule } from 'ngx-markdown';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './core/Interceptor/token.interceptor';
import { categoryApi } from './core/http/category.service';
import { commentsApi } from './core/http/comments.service';
import { postsAPi } from './core/http/post.service';
import { selectTheme } from './core/services/selectTheme.service';
import { SharedModule } from './shared/shared.module';
import { ThemeResolver } from './core/quards/userRoute.quards';

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
    RecaptchaModule,
    FormsModule,
    EditorModule,
    NgxCaptchaModule

  ],

  providers: [
    postsAPi,
    commentsApi,
    categoryApi,
    selectTheme,
    ThemeResolver,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
