/*
 * @Author: cwj
 * @Date: 2022-12-09 18:26:10
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-01 19:29:43
 * @Introduce: 
 */
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'App-MP';
  menu = [{
    label: '发现',
    path: '/home'
  }, {
    label: '歌单',
    path: '/sheet'
  }];
} 
