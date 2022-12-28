/*
 * @Author: cwj
 * @Date: 2022-12-10 20:50:03
 * @LastEditors: cwj
 * @LastEditTime: 2022-12-11 15:41:10
 * @Introduce: 
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-mp-carousel',
  templateUrl: './mp-carousel.component.html',
  styleUrls: ['./mp-carousel.component.less'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class MpCarouselComponent implements OnInit {
  @Input() activeIndex=0;
  @Output() changeSlide = new EventEmitter<'pre'|'next'>();
  @ViewChild('dot', { static: true }) dotRef: TemplateRef<any>;
  constructor() { }

  ngOnInit(): void {
  }

  onChangeSlide(type:'pre'|'next'){
    this.changeSlide.emit(type);
  }

}
