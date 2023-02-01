/*
 * @Author: cwj
 * @Date: 2022-12-31 02:59:41
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-01 02:47:48
 * @Introduce: 
 */
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChildren, asNativeElements } from '@angular/core';
import { INIT } from '@ngrx/store';
import { Song } from 'src/app/services/data-types/common.types';
import { MpScrollComponent } from '../mp-scroll/mp-scroll.component';
import { findIndex } from 'src/app/utils/array';
import { timer } from 'rxjs';
import { SongService } from 'src/app/services/song.service';
import { BaseLyricLine, MpLyric } from './mp-lyric';

@Component({
  selector: 'app-mp-player-panel',
  templateUrl: './mp-player-panel.component.html',
  styleUrls: ['./mp-player-panel.component.less']
})
export class MpPlayerPanelComponent implements OnInit, OnChanges {
  @Input() playing: boolean;  //歌曲播放状态
  @Input() songList: Song[];
  @Input() currentSong: Song;
  @Input() show: boolean;
  //Output实现子组件将信息通过事件的形式通知到父级组件
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  @Output() onChangeSong: EventEmitter<Song> = new EventEmitter<Song>();
  @Output() onDeleteSong: EventEmitter<Song> = new EventEmitter<Song>();
  @Output() onClearSong = new EventEmitter<void>();   //清空歌曲列表
  //后续两个面板都需要
  @ViewChildren(MpScrollComponent) private mpScroll: QueryList<MpScrollComponent> //滚动条

  //@Input() currentIndex: number;
  //取消传入当前播放歌曲索引，改为计算当前播放索引
  currentIndex: number;
  scrollY = 0;

  currentLyric: BaseLyricLine[];  //当前歌词
  currentLineNum: number; //当前歌词行数

  private lyric: MpLyric; //更改的歌词
  private lyricRefs: NodeList;//歌词节点集合
  private startLine = 2;//需要滚动的行数


  constructor(private songServe: SongService) { }

  //数据监听
  ngOnChanges(changes: SimpleChanges): void {
    //根据播放状态监听歌词变化
    if (changes['playing']) {
      //不是第一次改变
      if (!changes['playing'].firstChange) {
        this.lyric && this.lyric.togglePlay(this.playing);
      }
    }

    if (changes['songList']) {
      //console.log('songList:', this.songList);
      this.currentIndex = this.updateCurrentIndex();
    }
    //监听当前歌曲变化
    if (changes['currentSong']) {
      // console.log('currentSong:', this.currentSong);
      if (this.currentSong) {
        this.currentIndex = this.updateCurrentIndex();
        //this.currentIndex =  this.songList.findIndex(item => item.id===this.currentSong.id);
        this.updateLyric();
        if (this.show) {
          this.scrollCurrent();
        }
      } else {
        this.resetLyric();
      }
    }

    if (changes['currentIndex']) {
      console.log('currentIndex:', this.currentIndex);
    }
    //监听面板显隐
    if (changes['show']) {
      //页面第一次加载，就会触发第一次show变化，所以要剔除这次没意义的变化，刚进入页面是不需要列表面板刷新
      if (!changes['show'].firstChange && this.show) {
        //first代表多个mpScroll事件中的第一个
        //console.log('mpScroll:',this.mpScroll);
        this.mpScroll.first.refreshScroll();
        this.mpScroll.last.refreshScroll();
        // setTimeout(() => {
        //   if (this.currentSong) {
        //     this.scrollCurrent(0);
        //   }
        // }, 80)
        //将原生的setTimeout()替换为rxjs的timer
        timer(80).subscribe(() => {
          if (this.currentSong) {
            this.scrollCurrent(0);
          }
          if (this.lyricRefs) {
            this.scrollCurrentLyric(0);
          }
        })
      }
      //console.log('currentIndex:', this.currentIndex);
    }
  }

  //优化封装的方法
  private updateCurrentIndex() {
    return this.currentIndex = findIndex(this.songList, this.currentSong);
  }


  //更新歌词
  private updateLyric() {
    this.resetLyric();
    this.songServe.getLyric(this.currentSong.id).subscribe(res => {
      // console.log('res',res);
      this.lyric = new MpLyric(res);
      this.currentLyric = this.lyric.lines;
      //console.log('currentLyric:', this.currentLyric);
      this.startLine = res.tlyric ? 1 : 3;
      this.handleLyric();
      //歌词重置到顶部
      this.mpScroll.last.scrollTo(0, 0);
      //如果歌曲当前正在播放,则播放歌词
      if (this.playing) {
        this.lyric.play();
      }
    });
  }
  //重置歌词
  private resetLyric() {
    if (this.lyric) {
      this.lyric.stop();
      this.lyric = null;
      this.currentLyric = [];
      this.currentLineNum = 0;
      this.lyricRefs = null;
    }
  }
  //拖拽进度条改变歌词
  seekLyric(time: number) {
    if (this.lyric) {
      this.lyric.seek(time);
    }
  }
  //滚动歌词
  private handleLyric() {
    this.lyric.handler.subscribe(({ lineNum }) => {
      //console.log('lineNum:',lineNum);
      if (!this.lyricRefs) {
        this.lyricRefs = this.mpScroll.last.el.nativeElement.querySelectorAll('ul li');    //获取mpScroll组件的实例容器下的DOM
        console.log('lyricRefs:', this.lyricRefs);
      }
      if (this.lyricRefs.length) {
        this.currentLineNum = lineNum;
        if (lineNum > this.startLine) {
          this.scrollCurrentLyric();
        } else {
          this.mpScroll.last.scrollTo(0, 0);
        }
      }
    })
  }
  //移动滚动条
  private scrollCurrent(speed = 300) {
    //获取mpScroll组件的实例容器下的DOM
    const songListRefs = this.mpScroll.first.el.nativeElement.querySelectorAll('ul li')
    //console.log('songListRefs:',songListRefs);
    if (songListRefs.length) {
      //当前在播放的list标签
      const currentLi = <HTMLElement>songListRefs[this.currentIndex || 0];
      const offsetTop = currentLi.offsetTop;
      const offsetHeight = currentLi.offsetHeight;
      //console.log('scrollY', this.scrollY);
      //console.log('offsetTop', offsetTop);
      //console.log('offsetHeight', offsetHeight);
      //判断当前歌曲是否在可视范围内，如果在就不需要调整滚动条。当歌曲节点距离顶部的偏移量（offset）与滚动条的Y轴偏移量（scrollY）的差大于面板的轴体的显示量(offsetHeight*6)时，表示不在可视范围内
      //或者当歌曲节点距离顶部的偏移量（offset）小于动条的Y轴偏移量（scrollY），也不在可视范围内
      if ((offsetTop - Math.abs(this.scrollY)) > offsetHeight * 5 || offsetTop < Math.abs(this.scrollY)) {
        this.mpScroll.first.scrollToElement(currentLi, speed, true, true)
      }
    }
  }

  //移动歌词滚动条
  private scrollCurrentLyric(speed = 300) {
    const targetLine = this.lyricRefs[this.currentLineNum - this.startLine];
    if (targetLine) {
      this.mpScroll.last.scrollToElement(targetLine, speed, false, false);
    }
  }

  ngOnInit(): void {
  }

}
