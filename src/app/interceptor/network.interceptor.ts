import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {

  constructor(private readonly router: Router) {}

  handleError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 401) {
      this.router.navigateByUrl('/login');
    } else if (error.status === 403) {
      this.router.navigateByUrl('/login');
    } else if (error.status === 409) {
      Swal.fire(
        'Register Failed',
        'Indentities is already exist',
        'error'
      );
    }
    return throwError(() => new Error(error.message));
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const loggedIn = sessionStorage.getItem('token');
    const check = loggedIn ? true : false;
    if (check) {
      const newRequest: any = request.clone();
      newRequest.headers = request.headers.set('Authorization', `Bearer ${loggedIn}`);
      return next.handle(newRequest).pipe(
        catchError(err => this.handleError(err))
      );
    } else {
      return next.handle(request).pipe(
        catchError(err => this.handleError(err))
      );
    }
  }
}
