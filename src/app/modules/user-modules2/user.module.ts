import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './root/user.component';
import { UserFooter } from './components/footer/userfooter.component';
import { UserHomeComponent } from './pages/home/home.component';
import { UserCategoryComponent } from './pages/category/category.component';
import { UserContentComponent } from './pages/content/content.component';
import { HttpClientModule } from '@angular/common/http';

import { UserSubCategoryComponent } from './pages/subcategory/subcategory.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { postsAPi } from 'src/app/core/http/post.service';
import { categoryApi } from 'src/app/core/http/category.service';
import { commentsApi } from 'src/app/core/http/comments.service';
import { authenticationApi } from 'src/app/core/http/authentication.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { UserLoginComponent } from './pages/userAuthentication/login/userLogin.component';
import { UserRegisterComponent } from './pages/userAuthentication/register/userRegister.component';
import { UserProfileComponent } from './pages/profile/profile.component';
import { UserContactComponent } from './pages/contact/contact.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { editorsPickApi } from 'src/app/core/http/editorsPick.services';
import { siteSettingApi } from 'src/app/core/http/site-setting.service';
import { userApi } from 'src/app/core/http/userAccount.service';
import { checkLoginService } from 'src/app/core/services/checkUserStatus.service';
import { postFilterService } from 'src/app/core/services/filteredData.service';
import { trackDataService } from 'src/app/core/subjects/trackData.subject';
import { UserHeader } from './components/header/userheader.component';
import { SharedModule } from 'src/app/shared/shared.module';

//import { UserMainComponent } from './pages/root/root.component';

@NgModule({
  declarations: [
    UserComponent,
    UserHeader,
    UserFooter,
    UserHomeComponent,
    UserCategoryComponent,
    UserContentComponent,
    UserSubCategoryComponent,
    UserLoginComponent,
    UserRegisterComponent,
    UserProfileComponent,
    UserContactComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MarkdownModule.forRoot(),
    FormsModule,
    NgxCaptchaModule,
    SharedModule,
  ],
  providers: [
    postsAPi,
    categoryApi,
    editorsPickApi,
    siteSettingApi,
    checkLoginService,
    postFilterService,
    trackDataService,
    userApi,
    commentsApi,
    authenticationApi,
  ],
})
export class UserModule {}
