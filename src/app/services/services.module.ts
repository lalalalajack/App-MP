/*
 * @Author: cwj
 * @Date: 2022-12-09 19:22:54
 * @LastEditors: cwj
 * @LastEditTime: 2022-12-12 16:53:42
 * @Introduce: 
 */
import { InjectionToken, NgModule } from '@angular/core';

export const API_CONFIG = new InjectionToken('ApiConfigToken');

@NgModule({
  declarations: [
  ],
  imports: [
  ],
  providers: [
    { provide: API_CONFIG, useValue: 'http://localhost:3000/' }
  ]
})
export class ServicesModule { }
