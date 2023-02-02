import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject, map, takeUntil } from 'rxjs';
import { Lyric, Song } from 'src/app/services/data-types/common.types';
import { SongService } from 'src/app/services/song.service';
import { BaseLyricLine, MpLyric } from 'src/app/share/mp-ui/mp-player/mp-player-panel/mp-lyric';
import { AppStoreModule } from 'src/app/store';
import { BatchActionsService } from 'src/app/store/batch-actions.service';
import { getCurrentSong, getPlayer } from 'src/app/store/selectors/player.selector';

@Component({
  selector: 'app-song-info',
  templateUrl: './song-info.component.html',
  styleUrls: ['./song-info.component.less']
})
export class SongInfoComponent implements OnInit, OnDestroy {

  song: Song;
  lyric: BaseLyricLine[];

  // 动态展开
  controlLyric = {
    isExpand: false,
    label: '展开',
    iconCls: 'down'
  };

  currentSong: Song; //正在播放的歌曲
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
    //es6:结构赋值
    this.route.data.pipe(map(res => res['songInfo'])).subscribe(([song, lyric]) => {
      this.song = song;
      this.lyric = new MpLyric(lyric).lines;
      this.listenCurrent(); // 监听当前正在播放的歌曲
    });
  }

  ngOnInit(): void {
  }

  onAddSong(song: Song, isPlay: boolean = false) {
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

  // 监听当前歌曲变化，当页面销毁时解绑
  private listenCurrent() {
    this.store$
      .pipe(select(getPlayer), select(getCurrentSong), takeUntil(this.destroy$)).subscribe(song => {
        this.currentSong = song;
      })
  }

  // 展开/折叠
  toggleLyric() {
    this.controlLyric.isExpand = !this.controlLyric.isExpand;
    if (this.controlLyric.isExpand) {
      this.controlLyric.label = '收起';
      this.controlLyric.iconCls = 'up';
    } else {
      this.controlLyric.label = '展开';
      this.controlLyric.iconCls = 'down';
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(); //发射流
    this.destroy$.complete(); //结束自己
  }


}
