/*
 * @Author: cwj
 * @Date: 2022-12-22 10:25:15
 * @LastEditors: cwj
 * @LastEditTime: 2023-01-04 01:08:54
 * @Introduce: 
 */

import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PlayState } from "../reducers/player.reducer";
// 声明各个动作
const selectPlayerStates = (state: PlayState) => state;
export const getPlayer = createFeatureSelector<PlayState>('player');
export const getPlaying = createSelector(selectPlayerStates, (state: PlayState) => state.playing);
export const getPlayList = createSelector(selectPlayerStates, (state: PlayState) => state.playList);
export const getSongList = createSelector(selectPlayerStates, (state: PlayState) => state.songList);
export const getPlayMode = createSelector(selectPlayerStates, (state: PlayState) => state.playMode);
export const getCurrentIndex = createSelector(selectPlayerStates, (state: PlayState) => state.currentIndex);
//export const getCurrentAction = createSelector(selectPlayerStates, (state: PlayState) => state.currentAction);

export const getCurrentSong = createSelector(selectPlayerStates, ({ playList, currentIndex }: PlayState) => playList[currentIndex]);