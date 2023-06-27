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
    if (error.status === 401 || error.status === 403) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Sesi anda sudah habis',
      });
      this.router.navigateByUrl('/auth/login')
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
