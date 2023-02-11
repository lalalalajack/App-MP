import { BatchActionsService } from '../../../store/palyer-batch-actions.service';
import { SongService } from './../../../services/song.service';
import { SingerDetail, Song } from './../../../services/data-types/common.types';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, map, takeUntil } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AppStoreModule } from 'src/app/store';
import { Store, select } from '@ngrx/store';
import { getCurrentSong, getPlayer } from 'src/app/store/selectors/player.selector';
import { findIndex } from 'src/app/utils/array';

@Component({
  selector: 'app-singer-detail',
  templateUrl: './singer-detail.component.html',
  styleUrls: ['./singer-detail.component.less']
})
export class SingerDetailComponent implements OnInit , OnDestroy{

  singerDetail:SingerDetail; // 保存歌手详情
  currentSong: Song; //正在播放的歌曲
  currentIndex:number; //正在播放的歌曲的下标
  private destroy$ = new Subject<void>(); //发射流
  hasLiked=false;

  constructor(
    private route: ActivatedRoute,
    private store$: Store<AppStoreModule>,
    private songServe:SongService,
    private batchActionsServe:BatchActionsService,
    private nzMessageServe: NzMessageService
  ) {
    this.route.data.pipe(map(res => res['singerDetail'])).subscribe(res => {
      this.singerDetail = res;
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
          this.currentIndex = findIndex(this.singerDetail.hotSongs, song)
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

  onLikeSinger(arId:string){

  }

  onLikeSongs(songs:Song[]){

  }

  onLikeSong(songId:number){

  }

  onShareSong(song:Song){

  }







}
