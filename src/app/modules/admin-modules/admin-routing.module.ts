import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './root/admin.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { AdminThemesComponent } from './pages/admin-themes/admin-themes.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminSettingsComponent } from './pages/admin-settings/admin-settings.component';
import { AdminPostsComponent } from './pages/admin-posts/root/admin-posts.component';
import { PostPublishedComponent } from './pages/admin-posts/pages/published-posts/published.component';
import { PostDraftComponent } from './pages/admin-posts/pages/draft-posts/draft.component';
import { PostsTrashedComponent } from './pages/admin-posts/pages/trashed/trashed.component';
import { AddPostComponent } from './pages/admin-posts/pages/addPost/addPost.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', component: AdminHomeComponent },
      { path: 'themes', component: AdminThemesComponent },
      { path: 'settings', component: AdminSettingsComponent },
      {path:'posts', component: AdminPostsComponent,
    children:[{
      path:'published',
      component:PostPublishedComponent
    },
    {path:'drafts', component:PostDraftComponent},
    {path:'trashed', component:PostsTrashedComponent}
  ]}
    ],
  },
  {path:'newPost',component:AddPostComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes), HttpClientModule],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
