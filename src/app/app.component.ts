import { SetModalType } from './store/actions/member.action';
import { AppStoreModule } from './store/index';
import { Store } from '@ngrx/store';
import { ModalTypes } from 'src/app/store/reducers/member.reducer';
import { SearchResult } from './services/data-types/common.types';
import { SearchService } from './services/search.service';
/*
 * @Author: cwj
 * @Date: 2022-12-09 18:26:10
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-12 20:40:32
 * @Introduce:
 */
import { Component } from '@angular/core';
import { isEmptyObject } from './utils/tools';
import { MemberBatchActionsService } from './store/member-batch-actions.service';

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

  constructor(
    private SearchServe: SearchService,
    private store$: Store<AppStoreModule>,
    private memberBatchAction: MemberBatchActionsService
  ) {}

  onSearch(keyWords: string) {
    console.log('keyWords:', keyWords);
    if (keyWords) {
      this.SearchServe.search(keyWords).subscribe((res) => {
        this.searchResult = this.highlightKeyWords(keyWords, res);
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

  //变换弹窗类型（改变渲染的组件）
  onChangeModalType(modalType = ModalTypes.Default) {
    this.store$.dispatch(SetModalType({ modalType }));
  }

  //打开弹窗
  openModal(type: string) {
    console.log('执行到此',type);
    if (type === 'loginByPhone') {
      this.memberBatchAction.controlModal(true, ModalTypes.LoginByPhone);
    } else if (type === 'register') {
      this.memberBatchAction.controlModal(true, ModalTypes.Register);
    }
  }
}
