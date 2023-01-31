/*
 * @Author: cwj
 * @Date: 2023-02-01 00:06:20
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-01 00:51:25
 * @Introduce: 优化处理，封装批量提交
 */
import { Injectable } from '@angular/core';
import { AppStoreModule } from '.';
import { Song } from '../services/data-types/common.types';
import { Store, select } from '@ngrx/store';
import { PlayState } from './reducers/player.reducer';
import { getPlayer } from './selectors/player.selector';
import { SetCurrentIndex, SetPlayList, SetSongList } from './actions/player.action';
import { findIndex, shuffle } from '../utils/array';

@Injectable({
  providedIn: AppStoreModule
})
export class BatchActionsService {
  private playState: PlayState;
  constructor(private store$: Store<AppStoreModule>) {
    this.store$.pipe(select(getPlayer)).subscribe(res => this.playState = <PlayState>res);
  }

  //播放列表
  selectPlayList({ list, index }: { list: Song[], index: number }) {
    this.store$.dispatch(SetSongList({ songList: list }));
    //首页初始化时先订阅当前播放信息，在点击播放歌单时判断当前播放模式是否为随机，是则打乱歌单数组，重新计算当前歌曲的索引。
    let trueIndex = index, trueList = list.slice();
    if (this.playState.playMode.type === "random") {
      trueList = shuffle(list || []);
      trueIndex = findIndex(trueList, list[trueIndex]);
    }
    this.store$.dispatch(SetPlayList({ playList: trueList }));
    this.store$.dispatch(SetCurrentIndex({ currentIndex: trueIndex }));
  }

  //删除歌曲
  deleteSong(song: Song) {
    const songList = this.playState.songList.slice();
    const playList = this.playState.playList.slice();
    let currentIndex = this.playState.currentIndex;
    //找到歌曲在songList和playList里面的索引
    const sIndex = findIndex(songList, song);
    songList.splice(sIndex, 1);
    const pIndex = findIndex(playList, song);
    playList.splice(pIndex, 1);
    //当前播放的歌曲大于要删除的歌曲的下标，以及当前播放的歌曲就是最后一首歌
    if (currentIndex > pIndex || currentIndex === playList.length) {
      currentIndex--;
    }

    this.store$.dispatch(SetSongList({ songList }));
    this.store$.dispatch(SetPlayList({ playList }));
    this.store$.dispatch(SetCurrentIndex({ currentIndex }));
  }

  //清空歌曲(为了防止误操作，使用ngzorro的组件)
  clearSong() {
    this.store$.dispatch(SetSongList({ songList: [] }));
    this.store$.dispatch(SetPlayList({ playList: [] }));
    this.store$.dispatch(SetCurrentIndex({ currentIndex: -1 }));
  }
}
