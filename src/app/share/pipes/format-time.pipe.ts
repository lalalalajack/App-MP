/*
 * @Author: cwj
 * @Date: 2022-12-22 18:22:52
 * @LastEditors: cwj
 * @LastEditTime: 2022-12-22 18:24:59
 * @Introduce: 
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {

  transform(time: number): any {
    if (time) {
      const temp = time | 0;
      const minute = temp / 60 | 0;
      const second = (temp % 60).toString().padStart(2, '0');
      return `${minute}:${second}`;
    } else {
      return '00:00';
    }
  }

}
