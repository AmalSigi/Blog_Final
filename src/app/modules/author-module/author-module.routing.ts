
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import { DashboardComponent } from './author-home/Dashboard/dashboard.component';
import { AuthorComponent } from './roots/author-module.component';
import { AuthorHomeComponent } from './author-home/author-home.component';
import { AuthorProfile } from './author-profile/author-profile.component';
import { AuthorPosts } from './author-posts/author-posts.component';
import { AuthorPublishComponent } from './author-posts/pages/published/published.component';
import { AuthorDraftComponent } from './author-posts/pages/Draft/draft.component';
import { AuthorTrashedComponent } from './author-posts/pages/Trashed/trashed.comonent';
import { AuthorAddPostComponent } from './author-posts/pages/addPost/addPost.component';
import { AuthorSettingsComponent } from './author-settings/root/author-settings.component';
import {  AuthorCategoryComponents } from './author-settings/page/author-categories/AuthorCategory.component';
import { AuthorRootTagComponent } from './author-settings/page/author-tag/root/author-tag.component';
import { AuthorTagsComponent } from './author-settings/page/author-tag/tags/tags.component';
import { AuthorAddTagsComponent } from './author-settings/page/author-tag/add-tags/add-tags.component';
import { CommentPostComponent } from './author-comment/Root/commentPost.component';



const routes: Routes = [
    {path:'',component:AuthorComponent,
    children:[
        {
            path:'',component:AuthorHomeComponent,
            
            
        },
        {
            path:'profile',component:AuthorProfile
        },
        {
            path:'AuthorPosts',component:AuthorPosts,
            children:[
                {
                    path:'',component:AuthorPublishComponent,pathMatch:'full',


                },
                {path:'publish',component:AuthorPublishComponent},
                {path:'draft',component:AuthorDraftComponent},
                {path:'trash',component:AuthorTrashedComponent}

            ]
        },

        // {

        // path:'AddNew',component:AuthorAddPostComponent
        // },
        {
            path:'settings',component:AuthorSettingsComponent,
            children:[
                {path:'',component:AuthorSettingsComponent, pathMatch:'full'},
                
            ]
        },

        {path:'category',component:AuthorCategoryComponents},
        {path:'authortag',component:AuthorRootTagComponent,
    children:[
        {path:'',redirectTo:'tag',pathMatch:'full'},
        {path:'tag',component:AuthorTagsComponent},
        {path:'AddTags',component:AuthorAddTagsComponent}
    ]},
    {path:'comment',component:CommentPostComponent
}
    ]
 },
 {path:'AddNew' ,component:AuthorAddPostComponent}
]







@NgModule({
    imports: [RouterModule.forChild(routes), HttpClientModule],
    exports: [RouterModule],
  })
  export class AuthorRoutingModule {}