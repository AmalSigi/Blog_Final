import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './root/user.component';
import { HttpClientModule } from '@angular/common/http';
import { UserHomeComponent } from './pages/user-home/user-home.component';
import { UserContentComponent } from './pages/user-content/user-content.component';
import { UserCategoryComponent } from './pages/user-category/user-category.component';
import { UserSubcategoryComponent } from './pages/user-subcategory/user-subcategory.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', component: UserHomeComponent },
      { path: 'home', component: UserHomeComponent },
      { path: 'user/content/:postId', component: UserContentComponent },
      { path: 'category/:categoryId', component: UserCategoryComponent },
      {
        path: 'subcategory/:subcategoryId',
        component: UserSubcategoryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), HttpClientModule],
  exports: [RouterModule],
})
export class UserRoutingModule {}
