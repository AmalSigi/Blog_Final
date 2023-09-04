import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthorRoutingModule } from './author-module.routing';

import { AuthorComponent } from './roots/author-module.component';
//import { DashboardComponent } from './author-home/Dashboard/dashboard.component';
import { AuthorHomeComponent } from './author-home/author-home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MarkdownModule } from 'ngx-markdown';
import { postsAPi } from 'src/app/core/http/post.service';
import { userApi } from 'src/app/core/http/userAccount.service';
import { AuthorProfile } from './author-profile/author-profile.component';
import { AuthorPosts } from './author-posts/author-posts.component';
import { AuthorDraftComponent } from './author-posts/pages/Draft/draft.component';
import { AuthorPublishComponent } from './author-posts/pages/published/published.component';
import { AuthorTrashedComponent } from './author-posts/pages/Trashed/trashed.comonent';
import { AuthorNavBar } from './components/nav/nav-component';

import { SharedModelComponent } from 'src/app/shared/components/shared-model/shared-model.component';
import { commentsApi } from 'src/app/core/http/comments.service';
import { AuthorAddPostComponent } from './author-posts/pages/addPost/addPost.component';
import { AuthorToobarComponent } from './author-posts/pages/addPost/components/toolBar/toolbar.component';
import { AuthorTextToolbarComponent } from './author-posts/pages/addPost/components/textToolBar/textToolBar.component';
import {  AuthorAddPostSettingsComponent } from './author-posts/pages/addPost/components/settings/addPostSettings.component';
import { AuthorPostFeaturesComponent } from './author-posts/pages/addPost/components/postFeatures/postFeatures.component';
import { AuthorDropdownComponent } from './author-posts/pages/addPost/components/postFeatures/components/dropDown/dropdown.component';
import { tagApi } from 'src/app/core/http/tag.service';
import { categoryApi } from 'src/app/core/http/category.service';
import { AuthorSettingsComponent } from './author-settings/root/author-settings.component';
import {  AuthorCategoryComponents } from './author-settings/page/author-categories/AuthorCategory.component';
import { AuthorSubCategoryComponent } from './author-settings/page/author-categories/subcategory/AuthorSubcategory.component';
import { AuthorRootTagComponent } from './author-settings/page/author-tag/root/author-tag.component';
import { AuthorTagsComponent } from './author-settings/page/author-tag/tags/tags.component';
import { AuthorAddTagsComponent } from './author-settings/page/author-tag/add-tags/add-tags.component';
import { AuthorSharedModelComponent } from './shared/shared.component';
import { AuthorSharedModule } from './shared/sharedcomp.module';

import { CommentPostComponent } from './author-comment/Root/commentPost.component';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';



@NgModule({
    declarations: [

        AuthorNavBar,
        AuthorHomeComponent,
        AuthorComponent,
        AuthorProfile,
        AuthorPosts,
        AuthorDraftComponent,
        AuthorPublishComponent,
        AuthorTrashedComponent,
        AuthorAddPostComponent,
        AuthorTextToolbarComponent,
        AuthorToobarComponent,
        AuthorAddPostSettingsComponent,
        AuthorPostFeaturesComponent,
        AuthorDropdownComponent,
        AuthorSettingsComponent,
        AuthorCategoryComponents,
    AuthorSubCategoryComponent,
    AuthorRootTagComponent,
    AuthorTagsComponent,
    AuthorAddTagsComponent,

    CommentPostComponent,



 

      //  DashboardComponent  

    ],
    imports: [
       AuthorSharedModule,
        CommonModule,
        AuthorRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        SharedModule,
        FormsModule,
    MarkdownModule.forRoot(),
    EditorModule
    ],
    providers:[
        postsAPi,
        userApi,
        commentsApi,
        tagApi,
        categoryApi,
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }

        
    ],



})
export class AuthorModule{

}