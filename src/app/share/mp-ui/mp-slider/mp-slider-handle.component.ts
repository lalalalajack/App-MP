/*
 * @Author: cwj
 * @Date: 2022-12-13 16:10:32
 * @LastEditors: cwj
 * @LastEditTime: 2022-12-21 03:20:46
 * @Introduce: 按钮：水平-left;垂直-bottom
 */
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MpSliderStyle } from './mp-slider-types';

@Component({
  selector: 'app-mp-slider-handle',
  template: `<div class="mp-slider-handle" [ngStyle]="style"></div>`,
  changeDetection:ChangeDetectionStrategy.OnPush,
})


export class MpSliderHandleComponent implements OnInit, OnChanges {

  //是否是垂直模式
  @Input() mpVertical = false;
  //滑块偏移距离
  @Input() mpOffset: number;

  style:MpSliderStyle = {};

  constructor() { }

  //监听偏移量变化，OnChanges接口实现方法
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mpOffset']) {
      this.style[this.mpVertical ? 'bottom' : 'left'] = this.mpOffset + '%';
    }
  }

  ngOnInit(): void {
  }

}
