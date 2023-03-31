/*
 * @Author: cwj
 * @Date: 2022-12-09 18:26:10
 * @LastEditors: cwj
 * @LastEditTime: 2023-03-31 22:49:02
 * @Introduce:
 */
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { StorageService } from './services/storage.service';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { Observable, filter, map, mergeMap } from 'rxjs';
import { MemberService } from './services/member.service';
import { LoginParams } from './share/mp-ui/mp-layer/mp-layer-login/mp-layer-login.component';
import { SetModalType, SetUserId } from './store/actions/member.action';
import { AppStoreModule } from './store/index';
import { Store } from '@ngrx/store';
import { ModalTypes } from 'src/app/store/reducers/member.reducer';
import { SearchResult } from './services/data-types/common.types';
import { SearchService } from './services/search.service';
import { Component } from '@angular/core';
import { isEmptyObject } from './utils/tools';
import { MemberBatchActionsService } from './store/member-batch-actions.service';
import { User } from './services/data-types/member.types';
import { FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';

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
  mpRememberLogin: LoginParams;
  navEnd: Observable<NavigationEnd>; //表示当导航成功结束时触发的事件。
  routeTitle = ''; //变量保存title

  constructor(
    private SearchServe: SearchService,
    private store$: Store<AppStoreModule>,
    private memberBatchAction: MemberBatchActionsService,
    private memberServe: MemberService,
    private messageServe: NzMessageService,
    private storageServe: StorageService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private titleServe: Title
  ) {
    this.memberServe.helloWorld();

    //const userId = localStorage.getItem('mpUserId');
    const userId = this.storageServe.getStorage('mpUserId');
    if (userId) {
      this.store$.dispatch(SetUserId({ id: userId }));
      this.memberServe.getUserDetail(userId).subscribe((user) => {
        this.user = user;
      });
    }

    //const mpRememberLogin = localStorage.getItem('mpRememberLogin');
    const mpRememberLogin = this.storageServe.getStorage('mpRememberLogin');

    if (mpRememberLogin) {
      this.mpRememberLogin = JSON.parse(mpRememberLogin);
    }
    this.navEnd = <Observable<NavigationEnd>>(
      this.router.events.pipe(filter((evt) => evt instanceof NavigationEnd))
    );
    this.setTitle();
  }

  //设置页面标题
  private setTitle() {
    this.navEnd
      .pipe(
        map(() => this.activateRoute),
        map((route: ActivatedRoute) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        mergeMap((route) => route.data)
      )
      .subscribe((data) => {
        this.routeTitle = data['title'];
        this.titleServe.setTitle(this.routeTitle);
      });
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
    keywords: string,
    result: SearchResult
  ): SearchResult {
    if (!isEmptyObject(result)) {
      const reg = new RegExp(keywords, 'ig');
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
        //localStorage.setItem('mpUserId', user.phone);
        this.storageServe.setStorage({
          key: 'mpUserId',
          value: user.phone,
        });
        this.store$.dispatch(SetUserId({ id: user.phone.toString() }));

        if (params.remember) {
          this.storageServe.setStorage({
            key: 'mpRememberLogin',
            value: JSON.stringify(params),
          });
        } else {
          //localStorage.removeItem('mpRememberLogin');
          this.storageServe.removeStorage('mpRememberLogin');
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
    this.storageServe.removeStorage('mpUserId');
    this.store$.dispatch(SetUserId({ id: '' }));
    this.alertMessage('success', '退出成功');
    //localStorage.removeItem('mpUserId');
  }

  //注册
  onRegister(model: FormGroup) {
    const params = model.value;
    this.memberServe.registerUser(params).subscribe(
      (res: any) => {
        console.log('res1', res);
        this.messageServe.success('注册成功');
        this.memberBatchAction.controlModal(false);
      },
      (err: any) => {
        if (err.error.message === '该号码已被注册') {
          model.get('phone').setErrors({ registered: true });
        }
        this.messageServe.error('注册失败');
      }
    );
  }
}
