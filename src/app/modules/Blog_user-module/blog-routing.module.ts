import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './root/blog.component';

const routes: Routes = [
  { path: '', component: BlogComponent },
  {
    path: 'Theme1',
    loadChildren: () =>
      import('src/app/modules/user-modules/user.module').then(
        (m) => m.UserModule
      ),
  },
  {
    path: 'Theme2',
    loadChildren: () =>
      import('src/app/modules/user-modules2/user.module').then(
        (m) => m.UserModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class blogRoutingModule {
  constructor() {}
}
