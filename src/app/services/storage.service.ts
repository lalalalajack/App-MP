/*
 * @Author: cwj
 * @Date: 2023-02-16 19:07:57
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-16 19:14:58
 * @Introduce: 
 */
import { Injectable, Inject } from '@angular/core';
import { ServicesModule, WINDOW } from './services.module';
import { AnyJson } from './data-types/member.types';

@Injectable({
  providedIn: ServicesModule,
})
export class StorageService {
  constructor(@Inject(WINDOW) private win: Window) {}

  getStorage(key: string, type = 'local'): string {
    return window[type + 'Storage'].getItem(key);
  }
  
  setStorage(param: AnyJson | AnyJson[], type = 'local') {
    const kv = Array.isArray(param) ? param : [param];
    for (const { key, value } of kv) {
      window[type + 'Storage'].setItem(key, value.toString());
    }
  }

  removeStorage(param: string | string[], type = 'local') {
    const kv = Array.isArray(param) ? param : [param];
    for (const item of kv) {
      window[type + 'Storage'].removeItem(item);
    }
  }
}
