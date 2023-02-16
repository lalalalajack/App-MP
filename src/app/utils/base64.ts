/*
 * @Author: cwj
 * @Date: 2023-02-16 16:51:49
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-16 18:19:07
 * @Introduce:加密解密类
 */

import { AnyJson } from '../services/data-types/member.types';
import { Base64 } from 'js-base64';

export function codeJson(source: AnyJson, type = 'encode'): AnyJson {
  const result = {};
  for (const attr in source) {
    if (source.hasOwnProperty(attr)) {
      result[Base64[type](attr)] = Base64[type](source[attr]);
    }
  }
  return result;
}
