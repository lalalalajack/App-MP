/*
 * @Author: cwj
 * @Date: 2022-12-22 09:56:18
 * @LastEditors: cwj
 * @LastEditTime: 2022-12-22 16:27:18
 * @Introduce: 
 */
import { createAction, props } from "@ngrx/store";
import { Song } from "src/app/services/data-types/common.types";
import { PlayMode } from "src/app/share/mp-ui/mp-player/player-type";


//props 函数的作用就是将传递给 SetPlaying 函数的对象作为属性返回。
//这个函数可以让我们方便地创建带有自定义属性的 action，而无需手动创建对象。它使用起来非常方便，可以简化代码，并且更容易维护。
export const SetPlaying = createAction('[player] Set playing', props<{ playing: boolean }>());
export const SetPlayList = createAction('[player] Set playList', props<{ playList: Song[] }>());
export const SetSongList = createAction('[player] Set songList', props<{ songList: Song[] }>());
export const SetPlayMode = createAction('[player] Set playMode', props<{ playMode: PlayMode }>());
export const SetCurrentIndex = createAction('[player] Set currentIndex', props<{ currentIndex: number }>());
//export const SetCurrentAction = createAction('[player] Set currentAction', props<{ currentAction: CurrentActions }>());