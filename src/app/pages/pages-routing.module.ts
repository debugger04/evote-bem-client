import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouteGuard } from '../guard/route.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [RouteGuard],
    canActivateChild: [RouteGuard],
    loadChildren: () => import('../pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'login',
    canActivate: [RouteGuard],
    canActivateChild: [RouteGuard],
    component: LoginComponent
  },
  {
    path: 'register',
    canActivate: [RouteGuard],
    canActivateChild: [RouteGuard],
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
