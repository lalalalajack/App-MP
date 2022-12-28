/*
 * @Author: cwj
 * @Date: 2022-12-22 08:51:47
 * @LastEditors: cwj
 * @LastEditTime: 2022-12-22 21:39:55
 * @Introduce: 播放模式
 */
export type PlayMode = {
    type: 'loop' | 'random' | 'singleLoop';
    label: '循环' | '随机' | '单曲循环';
}