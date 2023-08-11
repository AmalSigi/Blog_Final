import { Injectable } from '@angular/core';

import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const authToken = JSON.parse(localStorage.getItem('jwtToken') || '{}');

    if (!request.url.includes('login')) {
   console.log(request)
      request = request.clone({
        setHeaders: {
          Authorization: ` ${authToken}`,
        },
      });
    }

    return next.handle(request);
  }
}
