/*
 * @Author: cwj
 * @Date: 2022-12-22 08:48:56
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-06 02:23:17
 * @Introduce: 用来维护状态的。reduce就是对数组元素进行累加计算成为一个值。
 * 缩减器或者折叠器
 * 总而言之一句话，redux当中的reducer之所以叫做reducer，是因为它和 Array.prototype.reduce 当中传入的回调函数非常相似。
 * 直观起见，我们还是拿JavaScript来理解。reduce属于一种高阶函数，它将其中的回调函数reducer递归应用到数组的所有元素上并返回一个独立的值。这也就是“缩减”或“折叠”的意义所在了。reduce有归纳，简化的意思，所以reducer可翻译成归并函数的意思
 */
import { Action, createReducer, on } from '@ngrx/store';
import { Song } from 'src/app/services/data-types/common.types';
import { PlayMode } from 'src/app/share/mp-ui/mp-player/player-type';
import {
  SetCurrentAction,
  SetCurrentIndex,
  SetPlayList,
  SetPlayMode,
  SetPlaying,
  SetSongList,
} from '../actions/player.action';

export enum CurrentActions{
  Add,
  Play,
  Delete,
  Clear,
  Other
}

export type PlayState = {
  playing: boolean; //播放状态
  playMode: PlayMode; //播放模式
  songList: Song[]; //歌曲列表
  playList: Song[]; //播放列表(播放列表不一定和歌曲列表一样)
  currentIndex: number; //当前正在播放的索引
  currentAction:CurrentActions; // 当前操作  
};

//初始数据格式
//初始并不知道播放的歌，所以索引为-1
export const initialState: PlayState = {
  playing: false,
  songList: [],
  playList: [],
  playMode: { type: 'loop', label: '循环' },
  currentIndex: -1,
  currentAction:CurrentActions.Other
};
// 注册动作
const reducer = createReducer(
  initialState,
  on(SetPlaying, (state, { playing }) => ({ ...state, playing })),
  on(SetPlayList, (state, { playList }) => ({ ...state, playList })),
  on(SetSongList, (state, { songList }) => ({ ...state, songList })),
  on(SetPlayMode, (state, { playMode }) => ({ ...state, playMode })),
  on(SetCurrentIndex, (state, { currentIndex }) => ({ ...state, currentIndex })),
  on(SetCurrentAction, (state, { currentAction }) => ({ ...state,  currentAction }))
);

export function playerReducer(state: PlayState, action: Action) {
  return reducer(state, action);
}
