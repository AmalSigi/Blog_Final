import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [{path: '', loadChildren: () => import('./modules/admin-modules/admin-module.module').then(m => m.AdminModule)  },
{path: 'user', loadChildren: () => import('./modules/user-modules/user.module').then(m => m.UserModule)  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
