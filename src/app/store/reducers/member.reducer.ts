import { SetUserId } from './../actions/member.action';
/*
 * @Author: cwj
 * @Date: 2023-02-11 15:37:45
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-17 01:36:54
 * @Introduce:
 */

import { Action, createReducer, on } from '@ngrx/store';
import { SetModalType, SetModalVisible } from '../actions/member.action';

//默认弹窗类型(元组)
export enum ModalTypes {
  Register = 'register',
  LoginByPhone = 'loginByPhone',
  Share = 'share',
  Like = 'like',
  Default = 'default',
}

export type MemberState = {
  modalVisible: boolean; //显隐状态
  modalType: ModalTypes; //弹窗类型
  userId: string; //用户id
};

//初始数据格式
export const initialState: MemberState = {
  modalVisible: false,
  modalType: ModalTypes.Default,
  userId: '',
};
// 注册动作
const reducer = createReducer(
  initialState,
  on(SetModalVisible, (state, { modalVisible }) => ({
    ...state,
    modalVisible,
  })),
  on(SetModalType, (state, { modalType }) => ({ ...state, modalType })),
  on(SetUserId, (state, { id }) => ({ ...state, userId:id }))
);

export function memberReducer(state: MemberState, action: Action) {
  return reducer(state, action);
}
