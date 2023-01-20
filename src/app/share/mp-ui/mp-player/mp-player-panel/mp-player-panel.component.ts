/*
 * @Author: cwj
 * @Date: 2022-12-31 02:59:41
 * @LastEditors: cwj
 * @LastEditTime: 2023-01-21 04:14:07
 * @Introduce: 
 */
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
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

  @Input() songList: Song[];
  @Input() currentSong: Song;
  //@Input() currentIndex: number;
  //取消传入当前播放歌曲索引，改为计算当前播放索引
  currentIndex: number;
  @Input() show: boolean;

  //Output实现子组件将信息通过事件的形式通知到父级组件
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  @Output() onChangeSong: EventEmitter<Song> = new EventEmitter<Song>();

  scrollY = 0;

  currentLyric:BaseLyricLine[];

  //后续两个面板都需要
  @ViewChildren(MpScrollComponent) private mpScroll: QueryList<MpScrollComponent>

  constructor(private songServe:SongService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['songList']) {
      //console.log('songList:', this.songList);
      this.currentIndex = 0;
    }
    //监听当前歌曲变化
    if (changes['currentSong']) {
      // console.log('currentSong:', this.currentSong);
      if (this.currentSong) {
        this.currentIndex = findIndex(this.songList, this.currentSong);
        //this.currentIndex =  this.songList.findIndex(item => item.id===this.currentSong.id);
        this.updateLyric();
        if (this.show) {
          this.scrollCurrent();
        }
      }
    }
    if (changes['currentIndex']) {
      console.log('currentIndex:', this.currentIndex);
    }
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
        //   }` 
        // }, 80)
        //将原生的setTimeout()替换为rxjs的timer
        timer(80).subscribe(() => {
          if (this.currentSong) {
            this.scrollCurrent(0);
          }
        })
      }
      //console.log('currentIndex:', this.currentIndex);
    }
  }
  private updateLyric() {
    this.songServe.getLyric(this.currentSong.id).subscribe(res=>{
      // console.log('res',res);
      const lyric = new MpLyric(res);
      this.currentLyric = lyric.lines;
      console.log('currentLyric:',this.currentLyric);
    });
  }
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

  ngOnInit(): void {
  }

}
