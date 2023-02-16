/*
 * @Author: cwj
 * @Date: 2023-02-13 03:15:19
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-16 17:10:40
 * @Introduce:
 */

export interface User {
  phone: string;
  password: string;
  nickname: string;
}

// 登出返回
export interface SampleBack extends AnyJson {
  code: number;
}
// 加密数据
export interface AnyJson {
  [key: string]: any;
}
