/*
 * @Author: cwj
 * @Date: 2023-02-01 19:37:04
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-03 02:08:55
 * @Introduce: 
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { Song, SongSheet } from 'src/app/services/data-types/common.types';
import { SongService } from 'src/app/services/song.service';
import { AppStoreModule } from 'src/app/store';
import { BatchActionsService } from 'src/app/store/palyer-batch-actions.service';
import { getPlayer, getCurrentSong } from 'src/app/store/selectors/player.selector';
import { findIndex } from 'src/app/utils/array';

@Component({
  selector: 'app-sheet-info',
  templateUrl: './sheet-info.component.html',
  styleUrls: ['./sheet-info.component.less']
})
export class SheetInfoComponent implements OnInit, OnDestroy {

  sheetInfo: SongSheet; // 保存歌单列表信息

  // 歌单描述
  description = {
    short: '',
    long: ''
  }

  // 动态展开
  controlDesc = {
    isExpand: false, //是否展开
    label: '展开',  //文字
    iconCls: 'down' //图标类型
  }

  currentSong: Song; //正在播放的歌曲
  currentIndex:number; //正在播放的歌曲的下标
  private destroy$ = new Subject<void>(); //发射流

  constructor(
    private route: ActivatedRoute,
    private store$: Store<AppStoreModule>,
    private songServe: SongService,
    private batchActionsServe: BatchActionsService,
    private nzMessageServe: NzMessageService
  ) {
    //route.data 是一个observable对象 包含了route的一些配置，
    //由于route.data包含了title,sheetInfo等多个信息，而我们只需要sheetInfo的数据，用map
    this.route.data.pipe(map(res => res['sheetInfo'])).subscribe(res => {
      this.sheetInfo = res;
      console.log('res', res);
      if (res.description) {
        this.changeDesc(res.description)
      }
      //监听当前正在播放的歌曲
      this.listenCurrent();
    });
  }

  private listenCurrent() {
    this.store$
      .pipe(select(getPlayer), select(getCurrentSong), takeUntil(this.destroy$)).subscribe(song => {
        this.currentSong = song;
        console.log('song', song);
        if (this.currentSong) {
          this.currentIndex = findIndex(this.sheetInfo.tracks, song)
        } else {
          this.currentIndex = -1;
        }
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next(); //发射流
    this.destroy$.complete(); //结束自己
  }

  ngOnInit(): void {
  }


  // 处理歌单描述
  private changeDesc(desc: string) {
    if (desc.length < 99) {
      this.description = {
        short: this.replaceBr('<b>介绍： </b>' + desc),
        long: ''
      }
    } else {
      this.description = {
        short: this.replaceBr('<b>介绍： </b>' + desc.slice(0, 99)) + '...',
        long: this.replaceBr('<b>介绍： </b>' + desc)
      }
    }
  }

  // 替换换行符为br标签
  private replaceBr(str: string): string {
    return str.replace(/\n/g, '<br />');
  }

  // 展开折叠
  toggleDesc() {
    this.controlDesc.isExpand = !this.controlDesc.isExpand;
    if (this.controlDesc.isExpand) {
      this.controlDesc.label = '收起';
      this.controlDesc.iconCls = 'up'
    } else {
      this.controlDesc.label = '展开';
      this.controlDesc.iconCls = 'down'
    }
  }

  //添加一首歌曲
  onAddSong(song: Song, isPlay = false) {
    if (!this.currentSong || this.currentSong.id !== song.id) {
      this.songServe.getSongList(song).subscribe(list => {
        if (list.length) {
          this.batchActionsServe.insertSong(list[0], isPlay);
        } else {
          //alert('无url');
          this.nzMessageServe.warning('无url');
        }
      });
    }
  }

  //添加多首歌曲
  onAddSongs(songs: Song[], isPlay = false) {
    this.songServe.getSongList(songs).subscribe(list => {
      if (list.length) {
        if (isPlay) {
          this.batchActionsServe.selectPlayList({ list, index: 0 });
        } else {
          this.batchActionsServe.insertSongs(list, isPlay);
        }
      }
    });
  }
}
