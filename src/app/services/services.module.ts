/*
 * @Author: cwj
 * @Date: 2022-12-09 19:22:54
 * @LastEditors: cwj
 * @LastEditTime: 2023-03-31 23:02:19
 * @Introduce: 
 */
import { isPlatformBrowser } from '@angular/common';
import { InjectionToken, NgModule, PLATFORM_ID } from '@angular/core';
import { httpInterceptorProvides } from './http-interceptors';

export const API_CONFIG = new InjectionToken('ApiConfigToken');
export const WINDOW = new InjectionToken('Window');

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    { provide: API_CONFIG, useValue: 'http://47.120.13.63:3000/' },
    { provide: WINDOW, useValue: 'Window' },
    httpInterceptorProvides
  ],
})
export class ServicesModule {}
