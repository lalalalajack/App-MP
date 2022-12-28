/*
 * @Author: cwj
 * @Date: 2022-12-13 16:10:32
 * @LastEditors: cwj
 * @LastEditTime: 2022-12-21 04:39:01
 * @Introduce: 滑动条:水平：width;垂直：height
 */
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MpSliderStyle } from './mp-slider-types';

@Component({
  selector: 'app-mp-slider-track',
  template: `<div class="mp-slider-track" [class.buffer]="mpBuffer" [ngStyle]="style"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MpSliderTrackComponent implements OnInit, OnChanges {

  @Input() mpVertical = false;
  @Input() mpLength: number;
  @Input() mpBuffer = false;

  style: MpSliderStyle = {};
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mpLength']) {
      if (this.mpVertical) {
        this.style.height = this.mpLength + '%';
        this.style.left = null;
        this.style.width = null;
      } else {
        this.style.width = this.mpLength + '%';
        this.style.bottom = null;
        this.style.height = null;
      }
    }

  }

  ngOnInit(): void {
  }

}
