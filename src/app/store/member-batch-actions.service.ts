import { SetCurrentAction } from './actions/player.action';
/*
 * @Author: cwj
 * @Date: 2023-02-01 00:06:20
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-11 21:45:38
 * @Introduce: 优化处理，封装批量提交
 */
import { Injectable } from '@angular/core';
import { AppStoreModule } from '.';
import { Store, select } from '@ngrx/store';
import { MemberState, ModalTypes } from './reducers/member.reducer';
import { getMember } from './selectors/member.selector';
import { SetModalType, SetModalVisible } from './actions/member.action';

@Injectable({
  providedIn: AppStoreModule,
})
export class MemberBatchActionsService {

  private memberState: MemberState;

  constructor(
      private store$: Store<AppStoreModule>,
  ) {
      this.store$.pipe(select(getMember)).subscribe(res => this.memberState = res)
  }

  //  会员弹窗显隐/ 类型
  controlModal (modalVisible = true, modalType = ModalTypes.Default) {
      this.store$.dispatch(SetModalType({ modalType }));
      this.store$.dispatch(SetModalVisible({ modalVisible }));
  }

}