/*
 * @Author: cwj
 * @Date: 2022-12-13 14:41:49
 * @LastEditors: cwj
 * @LastEditTime: 2022-12-22 19:54:25
 * @Introduce: 
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation, forwardRef } from '@angular/core';
import { Observable, Subscriber, Subscription, distinctUntilChanged, filter, fromEvent, map, merge, pluck, takeUntil, tap } from 'rxjs';
import { SliderEventObserverConfig, SliderValue } from './mp-slider-types';
import { DOCUMENT } from '@angular/common';
import { getElementOffset, sliderEvent } from './mp-slider-helper';
import { inArray } from 'src/app/utils/array';
import { getPercent, limitNumberInRange } from 'src/app/utils/number';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-mp-slider',
  templateUrl: './mp-slider.component.html',
  styleUrls: ['./mp-slider.component.less'],
  //表示组件的样式不应被封装。这意味着组件的样式将被全局应用到 DOM 上，并会影响所有与组件的选择器匹配的元素
  encapsulation: ViewEncapsulation.None,
  //onpush策略，代表input不发生变化的话，永远不会发生变更检测
  changeDetection: ChangeDetectionStrategy.OnPush,
  //为了实现表单功能而注入的tocken
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    //forwardRef引用一个尚未定义的类
    useExisting: forwardRef(() => MpSliderComponent),
    //tocken多个依赖
    multi: true
  }]
})

//让滑块实现ngMoudule,实际上就是让滑块具有表单的功能，需要实现接口ControlValueAccessor
export class MpSliderComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() mpVertical = false;
  @Input() mpMin = 0;
  @Input() mpMax = 100;
  @Input() bufferOffset: SliderValue = 0;

  @Output() mpOnAfterChange = new EventEmitter<SliderValue>()

  //定义dom元素
  private sliderDom: HTMLDivElement;
  //通过 ElemetRef拿到slider的dom
  //在 Angular 中，@ViewChild装饰器用于从组件类访问 DOM 元素的属性。参数指定元素的mpSlider名称，{ static: true }参数指定元素应该只被查询一次，当组件被初始化时。该static: true选项告诉 Angular 应该在ngAfterViewInit调用组件的生命周期钩子之前设置元素引用。如果static: false（默认值），元素引用将在ngAfterViewInit调用钩子后设置。static: true在元素始终存在于 DOM 中并且组件不需要在设置引用之前等待元素初始化的情况下，使用该选项可能很有用。这可以提高组件的性能，因为它避免了对元素是否存在的不必要检查。
  @ViewChild('mpSlider', { static: true }) private mpSlider: ElementRef;

  private dragStart$: Observable<number>;
  private dragMove$: Observable<number>;
  private dragEnd$: Observable<Event>;
  //以下三个为解除绑定的变量
  private dragStart_: Subscription | null;
  private dragMove_: Subscription | null;
  private dragEnd_: Subscription | null;

  //是否正在滑动
  private isDragging = false;

  value: SliderValue = null;
  offset: SliderValue = null;

  //注入ChangeDetectorRef来手动触发
  constructor(@Inject(DOCUMENT) private doc: Document, private cdr: ChangeDetectorRef) { }

  private onValueChange(value: SliderValue): void { };
  private onTouched(): void { };


  writeValue(value: SliderValue): void {
    this.setValue(value, true);
  }
  registerOnChange(fn: (value: SliderValue) => void): void {
    this.onValueChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  ngOnDestroy(): void {
    this.unsubscribeDrag();
  }

  ngOnInit(): void {
    //获得整个滑块的DOM元素（一个数组元素） 
    this.sliderDom = this.mpSlider.nativeElement;
    //输出即为整个滑块的数组元素
    //console.log('el:', this.mpSlider.nativeElement);
    this.createDraggingObservables();
    //订阅事件
    this.subscribeDrag(['start']);
  }

  private createDraggingObservables() {
    //定义鼠标位置对象
    const orientField = this.mpVertical ? 'pageY' : 'pageX';
    //pc
    const mouse: SliderEventObserverConfig = {
      start: 'mousedown',
      move: 'mousemove',
      end: 'mouseup',
      filterFunc: (e: MouseEvent) => e instanceof MouseEvent,
      pluckKey: [orientField],
    };

    //移动端
    const touch: SliderEventObserverConfig = {
      start: 'touchstart',
      move: 'touchmove',
      end: 'touchend',
      filterFunc: (e: TouchEvent) => e instanceof TouchEvent,
      pluckKey: ['touches', '0', orientField]
    };

    [mouse, touch].forEach(source => {
      const { start, move, end, filterFunc, pluckKey } = source;

      //分别绑定三个事件
      source.startPlucked$ = fromEvent(this.sliderDom, start).pipe(
        filter(filterFunc),
        tap(sliderEvent),
        pluck(...pluckKey),
        map((position: number) => this.findClosestValue(position))
      );

      //ps:不用原声的document，用ng封装好的document原因是方便以后可能的服务端渲染，所以尽量避免使用原生的浏览器对象
      source.end$ = fromEvent(this.doc, end);
      source.moveResolve$ = fromEvent(this.doc, move).pipe(
        filter(filterFunc),
        tap(sliderEvent),
        pluck(...pluckKey),
        //值改变的情况下，才往下发射流，如果一直不变的话，不发射
        distinctUntilChanged(),
        map((position: number) => this.findClosestValue(position)),
        //当end$发生的时候，moveResolve结束
        takeUntil(source.end$)
      );
    });

    //合并，方便订阅
    this.dragStart$ = merge(mouse.startPlucked$, touch.startPlucked$);
    this.dragMove$ = merge(mouse.moveResolve$, touch.moveResolve$);
    this.dragEnd$ = merge(mouse.end$, touch.end$);
  }

  //订阅类里，封装了一个inArray的工具类，详情见app/utils
  private subscribeDrag(events: string[] = ['start', 'move', 'end']) {
    if (inArray(events, 'start') && this.dragStart$ && !this.dragStart_) {
      this.dragStart_ = this.dragStart$.subscribe(this.onDragStart.bind(this));
    }
    if (inArray(events, 'move') && this.dragMove$ && !this.dragMove_) {
      this.dragMove_ = this.dragMove$.subscribe(this.onDragMove.bind(this));
    }
    if (inArray(events, 'end') && this.dragEnd$ && !this.dragEnd_) {
      this.dragEnd_ = this.dragEnd$.subscribe(this.onDragEnd.bind(this));
    }
  }

  private unsubscribeDrag(events: string[] = ['start', 'move', 'end']) {
    if (inArray(events, 'start') && this.dragStart_) {
      this.dragStart_.unsubscribe();
      this.dragStart_ = null;
    }
    if (inArray(events, 'move') && this.dragMove_) {
      this.dragMove_.unsubscribe();
      this.dragMove_ = null;
    }
    if (inArray(events, 'end') && this.dragEnd_) {
      this.dragEnd_.unsubscribe();
      this.dragEnd_ = null;
    }
  }

  //拿到的是鼠标按下的位置，所以入参是number
  private onDragStart(value: number) {
    // console.log('value:', value);
    this.toggleDragMoving(true);
    this.setValue(value);
  }

  private onDragMove(value: number) {
    if (this.isDragging) {
      this.setValue(value);
      //手动进行变更检测
      this.cdr.markForCheck();
    }

  }
  private onDragEnd() {
    //鼠标抬起发射value，给滑动条控制播放进度部分（mp-player.c.ts/onPercentChange）
    this.mpOnAfterChange.emit(this.value);
    this.toggleDragMoving(false);
    //手动进行变更检测
    this.cdr.markForCheck();
  }

  //needCheck 控制值得合法性
  private setValue(value: SliderValue, needCheck = false) {
    if (needCheck) {
      //在拖拽不检测
      if (this.isDragging) return;
      //改变成合法值
      this.value = this.formatValue(value);
      this.updateTrackAndHandles();
    } else if (!this.valuesEqual(this.value, value)) {
      this.value = value;
      this.updateTrackAndHandles();
      this.onValueChange(this.value);
    }
  }

  //把不合法的值变为合法的值
  private formatValue(value: SliderValue): SliderValue {
    let res = value;
    if (this.assertValueValid(value)) {
      res = this.mpMin;
    } else {
      res = limitNumberInRange(value, this.mpMin, this.mpMax);
    }
    return res;
  }

  //判断是否是NAN
  private assertValueValid(value: SliderValue): boolean {
    return isNaN(typeof value !== 'number' ? parseFloat(value) : value);
  }


  //优化步骤：判断是否一致来决定要不要更改
  valuesEqual(value: SliderValue, value1: SliderValue): boolean {
    if (typeof value !== typeof value1) {
      return false;
    }
    return value === value1;
  }

  //只需改变滑块和按钮处的offset或者mpLength
  private updateTrackAndHandles() {
    this.offset = this.getValueToOffset(this.value);
    //手动进行变更检测
    this.cdr.markForCheck();
  }
  getValueToOffset(value: SliderValue): SliderValue {
    return getPercent(this.mpMin, this.mpMax, value);
  }

  //绑定或者解绑事件
  private toggleDragMoving(movable: boolean) {
    this.isDragging = movable;
    if (movable) {
      this.subscribeDrag(['move', 'end']);
    } else {
      //没有滑动，则解绑moe,end事件\
      this.unsubscribeDrag(['move', 'end']);
    }
  }



  //滑块当前位置/滑块组件总长 ===（val-min)/(max-min)
  private findClosestValue(position: number): number {
    //获取滑块总长
    const sliderLength = this.getSliderLength();

    //获取滑块（左，上）端点位置
    const sliderStart = this.getSliderStartPosition();

    //滑块当前位置/滑块组件总长
    const ratio = limitNumberInRange((position - sliderStart) / sliderLength, 0, 1);
    const ratioTrue = this.mpVertical ? 1 - ratio : ratio;
    return ratioTrue * (this.mpMax - this.mpMin) + this.mpMin;
  }

  //获取滑块组件总长方法
  private getSliderLength(): number {
    return this.mpVertical ? this.sliderDom.clientHeight : this.sliderDom.clientWidth;
  }

  //获取滑块（左，上）端点的方法
  private getSliderStartPosition(): number {
    const offset = getElementOffset(this.sliderDom);
    return this.mpVertical ? offset.top : offset.left;
  }
}
