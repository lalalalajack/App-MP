/*
 * @Author: cwj
 * @Date: 2022-12-31 02:59:41
 * @LastEditors: cwj
 * @LastEditTime: 2022-12-31 05:17:52
 * @Introduce: 
 */
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { INIT } from '@ngrx/store';
import { Song } from 'src/app/services/data-types/common.types';

@Component({
  selector: 'app-mp-player-panel',
  templateUrl: './mp-player-panel.component.html',
  styleUrls: ['./mp-player-panel.component.less']
})
export class MpPlayerPanelComponent implements OnInit, OnChanges {

  @Input() songList: Song[];
  @Input() currentSong: Song;
  @Input() currentIndex: number;
  @Input() show: boolean;

  //Output实现子组件将信息通过事件的形式通知到父级组件
  @Output() onClose:EventEmitter<void> = new EventEmitter<void>();
  @Output() onChangeSong:EventEmitter<Song> = new EventEmitter<Song>();

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['songList']) {
      console.log('songList:', this.songList);
    }
    if (changes['currentSong']) {
      console.log('currentSong:', this.currentSong);
    }
    if (changes['currentIndex']) {
      console.log('currentIndex:', this.currentIndex);
    }
  }

  ngOnInit(): void {
  }

}
