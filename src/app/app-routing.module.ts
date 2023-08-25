import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/Blog_user-module/blog.module').then(
        (m) => m.blogModule
      ),
  },
  {
    path: 'author',
    loadChildren: () =>
      import('./modules/author-module/author-module').then(
        (m) => m.AuthorModule
      ),
  },

  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin-modules/admin-module.module').then(
        (m) => m.AdminModule
      ),
  },

  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
