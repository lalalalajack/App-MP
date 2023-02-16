/*
 * @Author: cwj
 * @Date: 2022-12-09 19:22:54
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-16 19:08:18
 * @Introduce: 
 */
/*
 * @Author: cwj
 * @Date: 2022-12-09 19:22:54
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-11 23:26:57
 * @Introduce:
 */
import { isPlatformBrowser } from '@angular/common';
import { InjectionToken, NgModule, PLATFORM_ID } from '@angular/core';

export const API_CONFIG = new InjectionToken('ApiConfigToken');
export const WINDOW = new InjectionToken('Window');

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    { provide: API_CONFIG, useValue: 'http://localhost:3000/' },
    { provide: WINDOW, useValue: 'Window' }
  ],
})
export class ServicesModule {}
