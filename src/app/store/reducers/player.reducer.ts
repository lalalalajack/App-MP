/*
 * @Author: cwj
 * @Date: 2022-12-22 08:48:56
 * @LastEditors: cwj
 * @LastEditTime: 2022-12-22 16:26:28
 * @Introduce: ngrx初始化播放器
 */
import { Action, createReducer, on } from "@ngrx/store";
import { Song } from "src/app/services/data-types/common.types";
import { PlayMode } from "src/app/share/mp-ui/mp-player/player-type";
import { SetCurrentIndex, SetPlayList, SetPlayMode, SetPlaying, SetSongList } from "../actions/player.action";

export type PlayState = {
    //播放状态
    playing: boolean;

    //播放模式
    playMode: PlayMode;

    //歌曲列表
    songList: Song[];

    //播放列表(播放列表不一定和歌曲列表一样)
    playList: Song[];

    //当前正在播放的索引
    currentIndex: number;
}

//初始并不知道播放的歌，所以索引为-1
export const initialState: PlayState = {
    playing: false,
    songList: [],
    playList: [],
    playMode: { type: 'loop', label: '循环' },
    currentIndex: -1,
}

const reducer = createReducer(
    initialState,
    on(SetPlaying, (state, { playing }) => ({ ...state, playing })),
    on(SetPlayList, (state, { playList }) => ({ ...state,  playList })),
    on(SetSongList, (state, { songList }) => ({ ...state,  songList })),
    on(SetPlayMode, (state, { playMode }) => ({ ...state,  playMode })),
    on(SetCurrentIndex, (state, { currentIndex }) => ({ ...state,  currentIndex })),
    //on(SetCurrentAction, (state, { currentAction }) => ({ ...state,  currentAction }))
  );

  export function playerReducer(state: PlayState, action: Action) {
    return reducer(state, action);
  }