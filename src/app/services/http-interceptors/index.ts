/*
 * @Author: cwj
 * @Date: 2023-02-17 02:23:51
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-17 02:33:23
 * @Introduce: 封装桶（barrel   ），multi: true意味HTTP_INTERCEPTORS是一个多重提供商的令牌，表示他会注入一个多值的数组，而不是单一的值
 */
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonInterceptor } from './common.interceptors';

export const httpInterceptorProvides = [
  { provide: HTTP_INTERCEPTORS, useClass: CommonInterceptor, multi: true } 
];
