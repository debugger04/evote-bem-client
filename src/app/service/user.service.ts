import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { baseUrl } from "./util/helper.util";
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly http: HttpClient, private readonly router: Router) { }

  register(data: any): Observable<any> {
    return this.http.post(baseUrl+'admin/register', data, {responseType: 'text'});
  }

  login(data: any): Observable<any> {
    return this.http.post(baseUrl+'admin/login', data, {responseType: 'text'});
  }

  logout() {
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }

  isLoggedIn(): boolean {
    const loggedIn = sessionStorage.getItem('token');
    if (loggedIn) {
      return true;
    }
    return false;
  }

  getRole() {
    const token = sessionStorage.getItem('token') || '';
    const decoded: any = jwtDecode(token);
    return decoded.orgname;
  }

  getUsername() {
    const token = sessionStorage.getItem('token') || '';
    const decoded: any = jwtDecode(token);
    return decoded.username;
  }
}
