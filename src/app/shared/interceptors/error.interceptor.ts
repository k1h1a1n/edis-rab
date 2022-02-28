import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
//import { ToastrService } from 'ngx-toastr';
// import { paths } from '../const';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // if (!req.url.includes('error')) {
    //   return next.handle(req);
    // }
    // console.warn('ErrorInterceptor');

    return next.handle(req).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {

        if (error.status !== 401) {
            // 401 handled in auth.interceptor
            // console.log('error.status: ' + error.message);
            // You can route to a url here
            //this.toastr.error(error.message);
        }
        console.log(error);
        return throwError(error);
      })
    );
  }
}
