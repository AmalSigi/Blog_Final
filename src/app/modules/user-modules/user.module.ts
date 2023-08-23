import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserHomeComponent } from './pages/user-home/user-home.component';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './root/user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserCategoryComponent } from './pages/user-category/user-category.component';
import { UserContentComponent } from './pages/user-content/user-content.component';
import { MarkdownModule } from 'ngx-markdown';
import { ReactiveFormsModule } from '@angular/forms';
import { categoryApi } from 'src/app/core/http/category.service';
import { commentsApi } from 'src/app/core/http/comments.service';
import { postsAPi } from 'src/app/core/http/post.service';
import { tagApi } from 'src/app/core/http/tag.service';
import { postData } from 'src/app/core/services/posts.services';
import { trackDataService } from 'src/app/core/subjects/trackData.subject';
import { checkLoginService } from 'src/app/core/services/checkUserStatus.service';
import { UserSubcategoryComponent } from './pages/user-subcategory/user-subcategory.component';
import { UserLoginComponent } from './pages/userAutentication/login/userLogin.component';

@NgModule({
  declarations: [
    UserHomeComponent,
    UserComponent,
    UserCategoryComponent,
    UserContentComponent,
    UserSubcategoryComponent,
    UserLoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    HttpClientModule,
    SharedModule,
    MarkdownModule.forRoot(),
  ],
  providers: [
    postsAPi,
    commentsApi,
    categoryApi,
    postData,
    tagApi,
    trackDataService,
    checkLoginService
  ],
})
export class UserModule {}
