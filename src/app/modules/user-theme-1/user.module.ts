import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { authenticationApi } from 'src/app/core/http/authentication.service';
import { categoryApi } from 'src/app/core/http/category.service';
import { commentsApi } from 'src/app/core/http/comments.service';
import { postsAPi } from 'src/app/core/http/post.service';
import { userApi } from 'src/app/core/http/userAccount.service';
import { checkLoginService } from 'src/app/core/services/checkUserStatus.service';
import { UserFooter } from './components/footer/userfooter.component';
import { UserHeader } from './components/header/userheader.component';
import { UserCategoryComponent } from './pages/category/category.component';
import { UserContentComponent } from './pages/content/content.component';
import { UserHomeComponent } from './pages/home/home.component';
import { UserSubCategoryComponent } from './pages/subcategory/subcategory.component';
import { UserComponent } from './root/user.component';
import {  theme1RoutingModule } from './user-routing.module';
import { editorsPickApi } from 'src/app/core/http/editorsPick.services';
import { siteSettingApi } from 'src/app/core/http/site-setting.service';
import { postFilterService } from 'src/app/core/services/filteredData.service';
import { trackDataService } from 'src/app/core/subjects/trackData.subject';
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

 //   UserMainComponent
    
  ],
  imports: [CommonModule, theme1RoutingModule,HttpClientModule,ReactiveFormsModule, MarkdownModule.forRoot(),],
  providers:[
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

  ]
})
export class theme1Module {}
