/*
 * @Author: cwj
 * @Date: 2023-02-05 04:48:45
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-05 05:13:27
 * @Introduce: 
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchResult } from 'src/app/services/data-types/common.types';

@Component({
  selector: 'app-mp-search-panel',
  templateUrl: './mp-search-panel.component.html',
  styleUrls: ['./mp-search-panel.component.less']
})
export class MpSearchPanelComponent implements OnInit {

  searchResult: SearchResult;
  constructor(
    private router: Router,
    //private jumpServe: JumpService
  ) { }

  ngOnInit(): void {
  }

  // 跳转
  toInfo(path: [string, number]) {
    if (path[1]) {
      //this.jumpServe.jump();
      this.router.navigate(path);
    }
  }

}
