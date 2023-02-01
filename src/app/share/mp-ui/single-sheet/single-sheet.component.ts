/*
 * @Author: cwj
 * @Date: 2022-12-11 18:07:56
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-01 18:21:43
 * @Introduce: 
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SongSheet } from 'src/app/services/data-types/common.types';

@Component({
  selector: 'app-single-sheet',
  templateUrl: './single-sheet.component.html',
  styleUrls: ['./single-sheet.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleSheetComponent implements OnInit {

  @Input() sheet: SongSheet;
  // @Output 修饰符用于定义一个属性，该属性可以用来在该组件的模板外部(home.component.html)将事件绑定到该组件。@Output 修饰符通常与 EventEmitter 类一起使用，该类用于在组件内部触发事件。
  @Output() onPlay = new EventEmitter<number>()

  constructor() { }

  ngOnInit(): void {
  }

  //播放歌单
  playSheet(id: number) {
    //点击发射number,在模板中接收
    this.onPlay.emit(id);
  }

  get coverImg(): string {
    return this.sheet.coverImgUrl || this.sheet.picUrl;
  }

}
