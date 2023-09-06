import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { AdminSettingsComponent } from './pages/admin-settings/root/admin-settings.component';
import { AdminThemesComponent } from './pages/admin-themes/admin-themes.component';
import { AdminComponent } from './root/admin.component';

import { CommentsComponent } from './pages/admin-comments/page/comments/comments.component';
import { SpamCommentsComponent } from './pages/admin-comments/page/spam-comments/spam-comments.component';
import { AdminCommentsComponent } from './pages/admin-comments/root/admin-comments.component';
import { AddCategoryComponent } from './pages/admin-settings/pages/admin-category/add-category/add-category.component';
import { CategoryComponent } from './pages/admin-settings/pages/admin-category/category/category.component';
import { SubCategoryComponent } from './pages/admin-settings/pages/admin-category/category/sub-category/sub-category.component';
import { AdminCategoryComponent } from './pages/admin-settings/pages/admin-category/root/admin-category.component';
import { AdminProfileComponent } from './pages/admin-settings/pages/admin-profile/admin-profile.component';
import { AddTagsComponent } from './pages/admin-settings/pages/admin-tag/page/add-tags/add-tags.component';
import { TagsComponent } from './pages/admin-settings/pages/admin-tag/page/tags/tags.component';
import { AdminTagComponent } from './pages/admin-settings/pages/admin-tag/root/admin-tag.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { categoryApi } from 'src/app/core/http/category.service';
import { commentsApi } from 'src/app/core/http/comments.service';
import { postsAPi } from 'src/app/core/http/post.service';
import { postData } from 'src/app/core/services/posts.services';
import { AddPostComponent } from './pages/admin-posts/pages/addPost/addPost.component';
import { DropdownComponent } from './pages/admin-posts/pages/addPost/components/postFeatures/components/dropDown/dropdown.component';
import { PostFeaturesComponent } from './pages/admin-posts/pages/addPost/components/postFeatures/postFeatures.component';
import { AddPostSettingsComponent } from './pages/admin-posts/pages/addPost/components/settings/addPostSettings.component';
import { ToobarComponent } from './pages/admin-posts/pages/addPost/components/toolBar/toolbar.component';
import { PostDraftComponent } from './pages/admin-posts/pages/draft-posts/draft.component';
import { PostPublishedComponent } from './pages/admin-posts/pages/published-posts/published.component';
import { PostsTrashedComponent } from './pages/admin-posts/pages/trashed/trashed.component';
import { AdminPostsComponent } from './pages/admin-posts/root/admin-posts.component';

import { MarkdownModule } from 'ngx-markdown';
import { ClickOutsideDirective } from 'src/app/core/directives/clcickOutside.directive';
import { authenticationApi } from 'src/app/core/http/authentication.service';
import { editorsPickApi } from 'src/app/core/http/editorsPick.services';
import { siteSettingApi } from 'src/app/core/http/site-setting.service';
import { tagApi } from 'src/app/core/http/tag.service';
import { userApi } from 'src/app/core/http/userAccount.service';
import { loginQuards } from 'src/app/core/quards/login.quard';
import { postFilterService } from 'src/app/core/services/filteredData.service';
import { selectTheme } from 'src/app/core/services/selectTheme.service';
import { trackDataService } from 'src/app/core/subjects/trackData.subject';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReportedCommnentViewComponent } from './pages/admin-comments/page/spam-comments/reported-commnent-view/reported-commnent-view.component';
import { UserPostsComponent } from './pages/admin-home/component/userDetails/pages/userPostList/userPostList.component';
import { RegisterComponent } from './pages/admin-home/component/userDetails/pages/userRegister/userRegister.component';
import { UsersDetailsComponents } from './pages/admin-home/component/userDetails/root/userDetails.component';
import { PostListComponent } from './pages/admin-posts/components/postList.component';
import { TextToolbarComponent } from './pages/admin-posts/pages/addPost/components/textToolBar/textToolBar.component';
import { EditorsPickComponent } from './pages/admin-posts/pages/editorsPick/editorsPick.component';
import { UncategorizedComponent } from './pages/admin-posts/pages/uncategorized/uncategorized.component';
import { AdminBlogSettingComponent } from './pages/admin-settings/pages/admin-site-setting/admin-blog-setting/admin-blog-setting.component';
import { AdminSiteSettingComponent } from './pages/admin-settings/pages/admin-site-setting/root/admin-site-setting.component';
import { SamplePageComponent } from './pages/admin-themes/component/sample.component';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { ActiveUsersComponent } from './pages/admin-home/component/active-users/active-users.component';
import { BlockedUsersComponent } from './pages/admin-home/component/blocked-users/blocked-users.component';
import { DeletedUsersComponent } from './pages/admin-home/component/deleted-users/deleted-users.component';
import { UsersListComponent } from './pages/admin-home/component/users-list/users-list.component';
import { AllMessagesComponent } from './pages/admin-messages/page/all-messages/all-messages.component';
import { ReadMeassageComponent } from './pages/admin-messages/page/read-meassage/read-meassage.component';
import { UnreadMeassageComponent } from './pages/admin-messages/page/unread-meassage/unread-meassage.component';
import { AdminMessagesComponent } from './pages/admin-messages/root/admin-messages.component';
import { AdminSocialMediaSettingComponent } from './pages/admin-settings/pages/admin-site-setting/admin-social-media-setting/admin-social-media-setting.component';
import { AdvertisementsComponent } from './pages/admin-advertisement/Advertisements/advertisements.component';
import { DynamicAdComponent } from './pages/admin-advertisement/Advertisements/pages/dynamic-ads/dynamicAd.component';
import { AdminAdvertisementComponent } from './pages/admin-advertisement/Advertisements/pages/admin-adverisement/admin-adverisement';
import { ChildContentComponent } from './pages/admin-advertisement/Advertisements/pages/admin-adverisement/chidContent.component/childcontent.component';
import { AdverisementHomeComponent } from './pages/admin-advertisement/Advertisements/pages/admin-adverisement/child-advertisement/childAdverisementHome.component';
import { ChildCategoryAdComponent } from './pages/admin-advertisement/Advertisements/pages/admin-adverisement/childCategoryAd/childcategory.component';
import { ChildSubCategoryAdComponent } from './pages/admin-advertisement/Advertisements/pages/admin-adverisement/childSubCategoryAd/childsubcategoryad.component';

@NgModule({
  declarations: [
    ChildSubCategoryAdComponent,
    ChildCategoryAdComponent,
    AdverisementHomeComponent,
    ChildContentComponent,
    AdminAdvertisementComponent,
    ClickOutsideDirective,
    NavbarComponent,
    AdminHomeComponent,
    AdminThemesComponent,
    AdminSettingsComponent,
    AdminComponent,
    AdminCategoryComponent,
    CategoryComponent,
    AddCategoryComponent,
    AdminTagComponent,
    SubCategoryComponent,
    TagsComponent,
    AddTagsComponent,
    CommentsComponent,
    SpamCommentsComponent,
    AddPostComponent,
    AddPostSettingsComponent,
    AdminPostsComponent,
    PostDraftComponent,
    PostPublishedComponent,
    PostsTrashedComponent,
    AdminProfileComponent,
    AdminCommentsComponent,
    PostFeaturesComponent,
    DropdownComponent,
    ToobarComponent,
    CommentsComponent,
    TextToolbarComponent,
    PostListComponent,
    UsersDetailsComponents,
    UserPostsComponent,
    RegisterComponent,
    ReportedCommnentViewComponent,
    EditorsPickComponent,
    AdminSiteSettingComponent,
    AdminBlogSettingComponent,
    SamplePageComponent,
    UncategorizedComponent,
    AdminSocialMediaSettingComponent,
    AdminMessagesComponent,
    AllMessagesComponent,

    UnreadMeassageComponent,
    ReadMeassageComponent,
    BlockedUsersComponent,
    DeletedUsersComponent,
    ActiveUsersComponent,
    UsersListComponent,
    AdvertisementsComponent,
    DynamicAdComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    EditorModule,

    FormsModule,
    MarkdownModule.forRoot(),
  ],

  providers: [
    postsAPi,

    commentsApi,

    categoryApi,

    postData,

    tagApi,

    authenticationApi,

    userApi,

    postFilterService,

    editorsPickApi,

    trackDataService,

    loginQuards,

    siteSettingApi,

    selectTheme,

    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
  ],
})
export class AdminModule {}
