/*
 * @Author: cwj
 * @Date: 2022-12-22 09:56:18
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-06 01:29:38
 * @Introduce: // 设置动作;在Redux规范中，所有的会引发状态更新的交互行为都必须通过一个显性定义的Action来进行。
 * Action表示应用中的各类动作或操作，不同的操作会改变应用相应的state状态，说白了就是一个带type属性的对象。
 */
import { createAction, props } from "@ngrx/store";
import { Song } from "src/app/services/data-types/common.types";
import { PlayMode } from "src/app/share/mp-ui/mp-player/player-type";
import { CurrentActions } from "../reducers/player.reducer";


//props 函数的作用就是将传递给 SetPlaying 函数的对象作为属性返回。
//这个函数可以让我们方便地创建带有自定义属性的 action，而无需手动创建对象。它使用起来非常方便，可以简化代码，并且更容易维护。
export const SetPlaying = createAction('[player] Set playing', props<{ playing: boolean }>());
export const SetPlayList = createAction('[player] Set playList', props<{ playList: Song[] }>());
export const SetSongList = createAction('[player] Set songList', props<{ songList: Song[] }>());
export const SetPlayMode = createAction('[player] Set playMode', props<{ playMode: PlayMode }>());
export const SetCurrentIndex = createAction('[player] Set currentIndex', props<{ currentIndex: number }>());
export const SetCurrentAction = createAction('[player] Set currentAction', props<{ currentAction: CurrentActions }>());