/*
 * @Author: cwj
 * @Date: 2022-12-22 10:25:15
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-16 20:44:13
 * @Introduce: 
 */

import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MemberState } from "../reducers/member.reducer";
// 声明各个选择器
const selectMemberStates = (state: MemberState) => state;
export const getMember = createFeatureSelector<MemberState>('member');
export const getModalVisible = createSelector(selectMemberStates, (state: MemberState) => state.modalVisible);
export const getModalType = createSelector(selectMemberStates, (state: MemberState) => state.modalType);
export const getUserId = createSelector(selectMemberStates, (state: MemberState) => state.userId);