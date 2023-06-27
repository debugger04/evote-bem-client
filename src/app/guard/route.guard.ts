import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Params, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate, CanActivateChild {

  constructor(private readonly router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authorize(state);
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authorize(state);
  }
  
  private redirect(): void {
    this.router.navigate(['login']).finally();
  }

  private authorize(state: RouterStateSnapshot): boolean {
    const authToken: boolean = sessionStorage.getItem('token') !== null;
    if (!authToken) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Kamu belum ada akses untuk halaman ini!',
      });
      this.redirect();
    }
    const menus = [
      {
        id: 1,
        name: 'home',
        location: ''
      },
      {
        id: 2,
        name: 'candidates',
        location: 'candidates'
      },
      {
        id: 3,
        name: 'event',
        location: 'event'
      },
      {
        id: 4,
        name: 'votes',
        location: 'votes'
      },
      {
        id: 5,
        name: 'result',
        location: 'result'
      }
    ];
    // some -> menghasilkan boolean
    return menus.some((m) => {
      return state.url.indexOf(m.location) > -1;
    })
  }
}
