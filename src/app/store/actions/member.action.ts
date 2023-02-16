/*
 * @Author: cwj
 * @Date: 2022-12-22 09:56:18
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-16 20:42:32
 * @Introduce: // 设置动作;在Redux规范中，所有的会引发状态更新的交互行为都必须通过一个显性定义的Action来进行。
 * Action表示应用中的各类动作或操作，不同的操作会改变应用相应的state状态，说白了就是一个带type属性的对象。
 */
import { createAction, props } from "@ngrx/store";
import { ModalTypes } from "../reducers/member.reducer";

//创建各个动作
export const SetModalVisible = createAction('[member] Set modal visible', props<{ modalVisible: boolean }>());
export const SetModalType = createAction('[member] Set modal type', props<{ modalType: ModalTypes }>());    
export const SetUserId = createAction('[member] Set user id', props<{ id: string }>());    