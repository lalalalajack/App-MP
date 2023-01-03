/*
 * @Author: cwj
 * @Date: 2022-12-22 08:48:56
 * @LastEditors: cwj
 * @LastEditTime: 2023-01-04 01:08:09
 * @Introduce: 用来维护状态的。reduce就是对数组元素进行累加计算成为一个值。
 */
import { Action, createReducer, on } from "@ngrx/store";
import { Song } from "src/app/services/data-types/common.types";
import { PlayMode } from "src/app/share/mp-ui/mp-player/player-type";
import { SetCurrentIndex, SetPlayList, SetPlayMode, SetPlaying, SetSongList } from "../actions/player.action";

export type PlayState = {

  playing: boolean; //播放状态
  playMode: PlayMode;//播放模式
  songList: Song[];//歌曲列表
  playList: Song[];//播放列表(播放列表不一定和歌曲列表一样)
  currentIndex: number; //当前正在播放的索引
}

//初始数据格式
//初始并不知道播放的歌，所以索引为-1
export const initialState: PlayState = {
  playing: false,
  songList: [],
  playList: [],
  playMode: { type: 'loop', label: '循环' },
  currentIndex: -1,
}
// 注册动作
const reducer = createReducer(
  initialState,
  on(SetPlaying, (state, { playing }) => ({ ...state, playing })),
  on(SetPlayList, (state, { playList }) => ({ ...state, playList })),
  on(SetSongList, (state, { songList }) => ({ ...state, songList })),
  on(SetPlayMode, (state, { playMode }) => ({ ...state, playMode })),
  on(SetCurrentIndex, (state, { currentIndex }) => ({ ...state, currentIndex })),
  //on(SetCurrentAction, (state, { currentAction }) => ({ ...state,  currentAction }))
);

export function playerReducer(state: PlayState, action: Action) {
  return reducer(state, action);
}