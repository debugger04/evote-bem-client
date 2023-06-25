import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly http: HttpClient, private readonly router: Router) { }

  logout() {
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
