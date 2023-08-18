import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './root/user.component';
import { HttpClientModule } from '@angular/common/http';
import { UserHomeComponent } from './pages/user-home/user-home.component';
import { UserContentComponent } from './pages/user-content/user-content.component';
import { UserCategoryComponent } from './pages/user-category/user-category.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', component: UserHomeComponent },
      { path: 'content', component: UserContentComponent },
      { path: 'category/:categoryId', component: UserCategoryComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), HttpClientModule],
  exports: [RouterModule],
})
export class UserRoutingModule {}
