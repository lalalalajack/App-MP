import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';
import { MemberService } from './services/member.service';
import { LoginParams } from './share/mp-ui/mp-layer/mp-layer-login/mp-layer-login.component';
/*
 * @Author: cwj
 * @Date: 2022-12-09 18:26:10
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-14 20:07:14
 * @Introduce:
 */
import { SetModalType } from './store/actions/member.action';
import { AppStoreModule } from './store/index';
import { Store } from '@ngrx/store';
import { ModalTypes } from 'src/app/store/reducers/member.reducer';
import { SearchResult } from './services/data-types/common.types';
import { SearchService } from './services/search.service';
import { Component } from '@angular/core';
import { isEmptyObject } from './utils/tools';
import { MemberBatchActionsService } from './store/member-batch-actions.service';
import { User } from './services/data-types/member.types';

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
  user: User;

  constructor(
    private SearchServe: SearchService,
    private store$: Store<AppStoreModule>,
    private memberBatchAction: MemberBatchActionsService,
    private memberServe: MemberService,
    private messageServe: NzMessageService
  ) {
    this.memberServe.helloWorld();
    const userId = localStorage.getItem('mpUserId');
    if (userId) {
      this.memberServe.getUserInfo(userId).subscribe((user) => {
        this.user = user;
      });
    }

    const mpRememberLogin = localStorage.getItem('mpUserId');
  }

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
    console.log('执行到此', type);
    if (type === 'loginByPhone') {
      this.memberBatchAction.controlModal(true, ModalTypes.LoginByPhone);
    } else if (type === 'register') {
      this.memberBatchAction.controlModal(true, ModalTypes.Register);
    }
  }

  //登陆
  onLogin(params: LoginParams) {
    this.memberServe.login(params).subscribe(
      (user: User) => {
        console.log('user:', user);
        this.user = user;
        this.memberBatchAction.controlModal(false);
        this.alertMessage('success', '登录成功');
        localStorage.setItem('mpUserId', user.phone);
        if (params.remember) {
          localStorage.setItem('mpRememberLogin', JSON.stringify(params));
        } else {
          localStorage.removeItem('mpRememberLogin');
        }
      },
      (error) => {
        console.log('error:', error);
        this.alertMessage('error', '登陆失败');
      }
    );
  }

  //提示信息
  private alertMessage(type: string, msg: string) {
    this.messageServe.create(type, msg);
  }

  //登出
  onLogout() {
    this.user = null;
    this.alertMessage('success', '退出成功');
    localStorage.removeItem('mpUserId');
  }
}
