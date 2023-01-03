/*
 * @Author: cwj
 * @Date: 2022-12-31 05:35:25
 * @LastEditors: cwj
 * @LastEditTime: 2023-01-04 01:25:27
 * @Introduce: 
 */
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import BScroll from '@better-scroll/core'
import ScrollBar from '@better-scroll/scroll-bar'
import MouseWheel from '@better-scroll/mouse-wheel'
import { timer } from 'rxjs';

//通过静态方法 BScroll.use() 注册插件
BScroll.use(ScrollBar)
BScroll.use(MouseWheel)
@Component({
  selector: 'app-mp-scroll',
  template: `
    <div class="mp-scroll" #wrap>
      <ng-content></ng-content>
    </div>
  `,
  styles: [`.mp-scroll{width: 100%; height: 100%; overflow: hidden;}`],
  // 视图封装
  encapsulation: ViewEncapsulation.None,
  //变更检测策略
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MpScrollComponent implements OnInit, AfterViewInit, OnChanges {
  //refreshDelay此处先写死
  @Input() refreshDelay: number = 50;
  @Input() data: any[];
  private bs: BScroll;

  //Output实现子组件将信息通过事件的形式通知到父级组件
  @Output() private onScrollEnd = new EventEmitter<number>();

  //通过ViewChild，利用子组件模板局部变量（wrap)
  @ViewChild('wrap', { static: true }) private wrapRef: ElementRef;

  constructor(readonly el: ElementRef) { }

  scrollToElement(...args) {
    //此处apply的使用可以看笔记js/函数/方法
    this.bs.scrollToElement.apply(this.bs, args)
  }

  ngOnChanges(changes: SimpleChanges): void {
    //当data改变时调用刷新方法
    if (changes['data']) {
      this.refreshScroll();
    }
  }
  ngAfterViewInit(): void {
    //传入dom
    this.bs = new BScroll(this.wrapRef.nativeElement, {
      scrollbar: {
        interactive: true,
      },
      mouseWheel: {
        speed: 20,
        invert: false,
        easeTime: 300
      }
    });
    this.bs.on('scrollEnd', ({ y }) => this.onScrollEnd.emit(y))
  }

  ngOnInit(): void {
  }

  //bs的API
  //作用：重新计算 BetterScroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。
  private refresh() {
    this.bs.refresh();
  }

  //提供一个公共的refresh；并且延迟操作，在变化后，再刷新
  refreshScroll() {
    //   setTimeout(()=>{
    //     this.refresh();
    //   },this.refreshDelay)
    timer(this.refreshDelay).subscribe(() => {
      this.refresh();
    });
  }
}
