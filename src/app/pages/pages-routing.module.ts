import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouteGuard } from '../guard/route.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '**',
    loadChildren: () => import('../pages/home/home.module').then(m => m.HomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
