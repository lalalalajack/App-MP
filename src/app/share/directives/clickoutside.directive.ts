/*
 * @Author: cwj
 * @Date: 2023-02-01 01:03:18
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-01 01:53:08
 * @Introduce: 使用指令更改面板绑定:将绑定与解绑封装为单独的指令文件
 * Renderer2是ng提供的操作DOM（ElementRef)服务
 */

import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, EventEmitter, Inject, Input, OnChanges, Output, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appClickoutside]'
})
export class ClickoutsideDirective implements OnChanges{

  private handleClick: () => void;
  @Output() onClickOutSide = new EventEmitter<any>(); // 发射解绑
  @Input() bindFlag = false; // 是否需要绑定

  constructor(
      private el: ElementRef, // dom
      private rd: Renderer2, // DOM渲染器，用来操作DOM
      @Inject(DOCUMENT) private doc: Document
  ) {}
  // 监听钩子
  ngOnChanges (changes: SimpleChanges): void {
      if (changes['bindFlag'] && !changes['bindFlag'].firstChange) {
          if (this.bindFlag) {
              this.handleClick = this.rd.listen(this.doc, 'click', fun => {
                //console.log('doc click');
                const target = fun.target;
                  const isContain = this.el.nativeElement.contains(fun.target)
                  //console.log('isContain',isContain);
                  if (!isContain) {
                      this.onClickOutSide.emit(target);
                  }
              })
          } else {
              this.handleClick();
          }
      }
  }
}

