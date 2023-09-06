import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCategoryComponent } from './pages/category/category.component';
import { UserContactComponent } from './pages/contact/contact.component';
import { UserContentComponent } from './pages/content/content.component';
import { UserHomeComponent } from './pages/home/home.component';
import { UserProfileComponent } from './pages/profile/profile.component';
import { UserSubCategoryComponent } from './pages/subcategory/subcategory.component';
import { UserComponent } from './root/user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: '',
        component: UserHomeComponent,
      },
      { path: 'category/:categoryId', component: UserCategoryComponent },
      {
        path: 'subcategory/:subcategoryId',
        component: UserSubCategoryComponent,
      },
      { path: 'content/:postId', component: UserContentComponent },
      { path: 'userprofile', component: UserProfileComponent },
      { path: 'contact', component: UserContactComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
