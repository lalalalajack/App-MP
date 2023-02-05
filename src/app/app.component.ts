import { SearchResult } from './services/data-types/common.types';
import { SearchService } from './services/search.service';
/*
 * @Author: cwj
 * @Date: 2022-12-09 18:26:10
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-05 22:52:38
 * @Introduce:
 */
import { Component } from '@angular/core';
import { isEmptyObject } from './utils/tools';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title = 'App-MP';
  menu = [
    {
      label: '发现',
      path: '/home',
    },
    {
      label: '歌单',
      path: '/sheet',
    },
  ];

  searchResult: SearchResult; //保存当前的搜索返回结果

  constructor(private SearchServe: SearchService) {}

  onSearch(keyWords: string) {
    console.log('keyWords:', keyWords);
    if (keyWords) {
      this.SearchServe.search(keyWords).subscribe((res) => {
        this.searchResult = this.highlightKeyWords(keyWords,res);
      });
    } else {
      this.searchResult = {};
    }
  }

  // 关键字高亮
  private highlightKeyWords(
    kewwords: string,
    result: SearchResult
  ): SearchResult {
    if (!isEmptyObject(result)) {
      const reg = new RegExp(kewwords, 'ig');
      ['artists', 'playlists', 'songs'].forEach((type) => {
        if (result[type]) {
          result[type].forEach((item) => {
            item.name = item.name.replace(
              reg,
              '<span class="highlight">$&</span>'
            );
          });
        }
      });
    }
    return result;
  }
}
