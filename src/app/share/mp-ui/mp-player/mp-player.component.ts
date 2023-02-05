import { timer } from 'rxjs';
/*
 * @Author: cwj
 * @Date: 2022-12-11 22:42:31
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-06 03:17:29
 * @Introduce:
 */
import { CurrentActions } from './../../../store/reducers/player.reducer';
import { getCurrentAction } from './../../../store/selectors/player.selector';
import { Router } from '@angular/router';
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Song } from 'src/app/services/data-types/common.types';
import { AppStoreModule } from 'src/app/store';
import {
  getCurrentIndex,
  getCurrentSong,
  getPlayList,
  getPlayMode,
  getPlayer,
  getSongList,
} from 'src/app/store/selectors/player.selector';
import { PlayMode } from './player-type';
import {
  SetCurrentAction,
  SetCurrentIndex,
  SetPlayList,
  SetPlayMode,
  SetSongList,
} from 'src/app/store/actions/player.action';
import { Subscription, from, fromEvent } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { findIndex, shuffle } from 'src/app/utils/array';
import { MpPlayerPanelComponent } from './mp-player-panel/mp-player-panel.component';
import { flush } from '@angular/core/testing';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BatchActionsService } from 'src/app/store/batch-actions.service';
import {
  AnimationEvent,
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

const modeTypes: PlayMode[] = [
  {
    type: 'loop',
    label: '循环',
  },
  {
    type: 'random',
    label: '随机',
  },
  {
    type: 'singleLoop',
    label: '单曲循环',
  },
];

enum TipTitle {
  Add = '已添加到列表',
  Play = '已开始播放',
}

@Component({
  selector: 'app-mp-player',
  templateUrl: './mp-player.component.html',
  styleUrls: ['./mp-player.component.less'],
  animations: [
    // 创建动画, 动画名称为 showHide
    trigger('showHide', [
      // 指定元素样式
      state('show', style({ bottom: 0 })),
      state('hide', style({ bottom: -71 })),
      // // 指定入场动画 注意: 字符串两边不能有空格, 箭头两边可以有也可以没有空格
      transition('show=>hide', [animate('0.3s')]),
      transition('hide=>show', [animate('0.1s')]),
    ]),
  ],
})
export class MpPlayerComponent implements OnInit {
  //控制文字提示（tooltip）
  controlTooltip = {
    title: '',
    show: false,
  };

  showPlayer = 'hide'; // 动画初始状态
  isLocked = false; // 面板是否被锁
  animating = false; // 是否正在动画

  percent = 0;
  bufferPercent = 0;

  //watch到的数值保存于此
  songList: Song[];
  playList: Song[];
  currentIndex: number;
  currentSong: Song;

  //歌曲总时长
  duration: number;
  //歌曲当前已播放时长
  currentTime: number;

  // 播放状态
  playing = false;

  // 是否可以播放
  songReady = false;

  //音量
  volume = 10;

  //是否显示音量面板
  showVolumePanel: boolean = false;

  //是否绑定document click事件
  bindFlag = false;

  //绑定window的click事件
  private winClick: Subscription;

  //当前模式
  currentMode: PlayMode;
  modeCount = 0;

  //是否显示列表面板
  showListPanel: boolean = false;

  @ViewChild('audio', { static: true }) private audio: ElementRef;
  @ViewChild(MpPlayerPanelComponent, { static: false }) private playerPanel;
  private audioEl: HTMLAudioElement;

  constructor(
    private store$: Store<AppStoreModule>,
    @Inject(DOCUMENT) private doc: Document,
    private nzModalServe: NzModalService,
    private batchAction: BatchActionsService,
    private router: Router
  ) {
    const appStore$ = this.store$.pipe(select(getPlayer));
    //select操作符非原生，是ngrx携带的
    // appStore$.pipe(select(getSongList)).subscribe(list => {
    //   console.log('getSongList:', list);
    // });
    // appStore$.pipe(select(getPlayList)).subscribe(list => {
    //   console.log('getPlayList:', list);
    // });
    // appStore$.pipe(select(getCurrentIndex)).subscribe(index => {
    //   console.log('getCurrentIndex:', index);
    // });

    const stateArr = [
      {
        type: getSongList,
        cb: (list) => this.watchList(list, 'songList'),
      },
      {
        type: getPlayList,
        cb: (list) => this.watchList(list, 'playList'),
      },
      {
        type: getCurrentIndex,
        cb: (index) => this.watchCurrentIndex(index),
      },
      {
        type: getPlayMode,
        cb: (mode) => this.watchPlayMode(mode),
      },
      {
        type: getCurrentSong,
        cb: (song) => this.watchCurrentSong(song),
      },
      {
        type: getCurrentAction,
        cb: (action) => this.watchCurrentAction(action),
      },
    ];

    stateArr.forEach((item: any) => {
      appStore$.pipe(select(item.type)).subscribe(item.cb);
    });
  }
  private watchCurrentSong(song: Song) {
    if (song) {
      this.currentSong = song;
      this.duration = song.dt / 1000;
    }

    console.log('song:', this.currentSong);
  }
  private watchPlayMode(mode: PlayMode) {
    //console.log('mode:', mode);
    this.currentMode = mode;
    if (this.songList) {
      //避免引用问题，复制一个list
      let list = this.songList.slice();
      if (mode.type === 'random') {
        list = shuffle(this.songList);
      }
      //改变播放模式的时候，当前放的歌曲照样放
      this.updateCurrentIndex(list, this.currentSong);
      //console.log("list:", list);
      this.store$.dispatch(SetPlayList({ playList: list }));
    }
  }

  private watchList(list: Song[], type: string) {
    //console.log('list :', type, list);
    this[type] = list;
  }
  private watchCurrentIndex(index: number) {
    //console.log('index :', index);
    this.currentIndex = index;
  }

  private watchCurrentAction(action: CurrentActions) {
    const title = TipTitle[CurrentActions[action]];
    console.log('action:', CurrentActions[action]);
    if (title) {
      this.controlTooltip.title = title;
      if (this.showPlayer === 'hide') {
        //如果播放器是收起的状态，先让它弹起来
        this.togglePlayer('show');
      } else {
        this.showToolTip();
      }
    }
    this.store$.dispatch(
      SetCurrentAction({ currentAction: CurrentActions.Other })
    );
  }

  onAnimateDone(event: AnimationEvent) {
    this.animating = false;
    if (event.toState === 'show' && this.controlTooltip.title) {
      // 动画是从hide到show的过程
      this.showToolTip();
    }
  }

  showToolTip() {
    this.controlTooltip.show = true;
    timer(1500).subscribe(() => {
      this.controlTooltip = {
        title: '',
        show: false,
      };
    });
  }

  ngOnInit(): void {
    this.audioEl = this.audio.nativeElement;
    //console.log('audio:',this.audio.nativeElement);
  }

  //更新当前在播放的歌的index
  private updateCurrentIndex(list: Song[], song: Song) {
    //寻找当前正在播放的歌在shuffle后的index
    //const newIndex = list.findIndex(item => item.id === song.id);
    const newIndex = findIndex(list, song);
    this.store$.dispatch(SetCurrentIndex({ currentIndex: newIndex }));
  }

  // 点击面板外部
  onClickOutSide() {
    this.showVolumePanel = false;
    this.showListPanel = false;
    this.bindFlag = false;
  }

  //改变模式
  changeMode() {
    // const temp = modeTypes[++this.modeCount % 3];
    // console.log(temp);
    this.store$.dispatch(
      SetPlayMode({ playMode: modeTypes[++this.modeCount % 3] })
    );
  }

  //点击切换列表面板的显示
  toggleListPanel() {
    //有歌的时候才显示这块面板
    if (this.songList.length) this.togglePanel('showListPanel');
  }

  //点击切换音量面板的显示
  toggleVolPanel() {
    this.togglePanel('showVolumePanel');
  }

  togglePanel(type: string) {
    //动态变量的方式来访问this对象属性
    this[type] = !this[type];
    /* if (this.showVolumePanel || this.showListPanel) { //如果音量或者列表面板存在，绑定一个全局click事件（点击外侧消失面板）
      this.bindFlag = true;
    } else {
      this.bindFlag = false;
    } */
    this.bindFlag = this.showVolumePanel || this.showListPanel;
  }

  /* bindDocumentClickListener(type: string) {
    if (!this.winClick) {
      this.winClick = fromEvent(this.doc, 'click').subscribe(() => {
        if (!this.selfClick) { //即点击了播放器除了控制面板以外的部分
          //此时隐藏面板
          this[type] = false;
          //此时解绑事件
          this.unbindDocumentClickListener(type);
        }
        this.selfClick = false;
      });
    }
  } */
  /* unbindDocumentClickListener(type: string) {
    if (this.winClick) {
      this.winClick.unsubscribe();
      this.winClick = null;
    }
  } */

  //列表更改歌曲
  onChangeSong(song: Song) {
    //this.currentSong = song;
    this.updateCurrentIndex(this.playList, song);
  }

  // 控制音量
  onVolumeChange(per: number) {
    this.audioEl.volume = per / 100;
  }

  //获得滑动条滑动百分比
  onPercentChange(per: number) {
    if (this.currentSong) {
      //console.log("per:", per)
      //滑动条控制播放进度
      const currentTime = this.duration * (per / 100);
      this.audioEl.currentTime = currentTime;
      if (this.playerPanel) {
        this.playerPanel.seekLyric(currentTime * 1000);
      }
    }
  }

  // 播放/暂停
  onToggle() {
    //当前没有歌曲在播放，但是待播列表有曲目，选择第一首播放
    if (!this.currentSong) {
      if (this.playList.length) {
        this.store$.dispatch(SetCurrentIndex({ currentIndex: 0 }));
        this.songReady = false;
      }
    } else {
      if (this.songReady) {
        this.playing = !this.playing;
        if (this.playing) {
          this.audioEl.play();
        } else {
          this.audioEl.pause();
        }
      }
    }
  }

  // 上一曲
  onPrev(index: number) {
    if (!this.songReady) {
      return;
    }
    if (this.playList.length === 1) {
      this.loop();
    } else {
      const newIndex = index < 0 ? this.playList.length - 1 : index;
      this.updateIndex(newIndex);
    }
  }

  // 下一曲
  onNext(index: number) {
    if (!this.songReady) {
      return;
    }
    if (this.playList.length === 1) {
      this.loop();
    } else {
      const newIndex = index >= this.playList.length ? 0 : index;
      this.updateIndex(newIndex);
    }
  }
  //方法封装
  private updateIndex(index: number) {
    this.store$.dispatch(SetCurrentIndex({ currentIndex: index }));
    this.songReady = false;
  }

  //一首歌播放结束
  onEnded() {
    this.playing = false;
    if (this.currentMode.type === 'singleLoop') {
      this.loop();
    } else {
      this.onNext(this.currentIndex + 1);
    }
  }

  // 单曲循环
  private loop() {
    this.audioEl.currentTime = 0;
    this.play();
    if (this.playerPanel) {
      this.playerPanel.seekLyric(0);
    }
  }

  //点击歌单播放触发事件
  onCanplay() {
    this.songReady = true;
    this.play();
  }

  private play() {
    this.audioEl.play();
    this.playing = true;
  }

  //歌曲已经播放时长
  OnTimeUpdate(e: Event) {
    this.currentTime = (<HTMLAudioElement>e.target).currentTime;
    //console.log('time:',(<HTMLAudioElement>e.target).currentTime);
    //歌曲播放的同时，联动滑块
    this.percent = (this.currentTime / this.duration) * 100;
    //联动缓冲条,buffered 属性返回 TimeRanges 对象。TimeRanges 对象表示音频的缓冲区间。缓冲范围指的是已缓冲音视频的时间范围。
    const buffered = this.audioEl.buffered;
    //似乎以下可以不包个判定条件也行
    if (buffered.length && this.bufferPercent < 100) {
      this.bufferPercent = (buffered.end(0) / this.duration) * 100;
    }
  }

  //获取当前正在播放歌曲照片
  get picUrl(): string {
    return this.currentSong ? this.currentSong.al.picUrl : null;
  }

  //删除歌曲
  onDeleteSong(song: Song) {
    this.batchAction.deleteSong(song);
  }

  //清空歌曲(为了防止误操作，使用ngZorro的组件)
  onClearSong() {
    this.nzModalServe.confirm({
      nzTitle: '确认清空列表？',
      nzOnOk: () => {
        this.batchAction.clearSong();
      },
    });
  }

  //跳转,入参是一个元组类型
  toInfo(path: [string, number]) {
    if (path[1]) {
      this.showVolumePanel = false;
      this.showListPanel = false;
      this.router.navigate(path);
    }
  }

  // 面板动画
  togglePlayer(type: string) {
    if (!this.isLocked && !this.animating) {
      this.showPlayer = type;
    }
  }
}
