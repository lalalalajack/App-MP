/*
 * @Author: cwj
 * @Date: 2023-02-17 02:19:37
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-17 02:22:32
 * @Introduce: 简易的http拦截器
 */
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable()
export class CommonInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req.clone({ //复制req请求
      withCredentials: true //在跨域请求时，会携带用户凭证
    })).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): never {
    throw error.error;
  }
}

