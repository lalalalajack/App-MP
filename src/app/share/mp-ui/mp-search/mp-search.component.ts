/*
 * @Author: cwj
 * @Date: 2023-02-03 22:34:47
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-05 22:12:26
 * @Introduce:
 */
import { MpSearchPanelComponent } from './mp-search-panel/mp-search-panel.component';
import {
  Overlay,
  OverlayModule,
  OverlayRef,
  PositionStrategy,
} from '@angular/cdk/overlay';
import { SearchResult } from './../../../services/data-types/common.types';
import { NzInputModule } from 'ng-zorro-antd/input';
import {
  Input,
  TemplateRef,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {
  debounceTime,
  pluck,
  distinctUntilChanged,
  fromEvent,
  map,
} from 'rxjs';
import { isEmptyObject } from 'src/app/utils/tools';
import { ComponentPortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-mp-search',
  templateUrl: './mp-search.component.html',
  styleUrls: ['./mp-search.component.less'],
})
export class MpSearchComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() customView: TemplateRef<any>;
  @Input() searchResult: SearchResult;
  @Input() connectRef: ElementRef;
  @Output() onSearch = new EventEmitter<string>();
  @ViewChild('nzInput', { static: false }) private nzInput: ElementRef;
  @ViewChild('search', { static: false }) private defaultRef: ElementRef;

  private overlayRef: OverlayRef;
  constructor(
    private overlay: Overlay, // 浮层CDK
    private viewContainerRef: ViewContainerRef // ComponentPortal extends Portal（传送点API所需要参数）要容纳模板生成物的 ViewContainer 的引用。
  ) {}

  // 搜索值监听
  ngOnChanges(changes: SimpleChanges): void {
    //通过监听searchResult的值的是否改变，来决定浮层的显示与否
    if (changes['searchResult'] && !changes['searchResult'].firstChange) {
      if (!isEmptyObject(this.searchResult)) {
        this.showOverlayPanel();
      } else {
        this.hideOverlayPanel();
      }
    }
  }

  // 添加浮层
  showOverlayPanel() {
    //先隐藏上一次的
    this.hideOverlayPanel();
    const positionStrategy: PositionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.connectRef || this.defaultRef)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
        },
      ])
      .withLockedPosition(true); // 浮层定位策略(详情可见浮层overlay的api的doc)
    // OverlayRef 是一个 PortalOutlet。一旦创建它，就可以为它附着一个 Portal 来添加内容。
    this.overlayRef = this.overlay.create({
      hasBackdrop: true, // 浮层是否有背景板
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });
    const panelPortal = new ComponentPortal(
      MpSearchPanelComponent,
      this.viewContainerRef
    ); // 门户：一小块 UI，可以被动态渲染到页面上的空白插槽（slot）中，这“一小块 UI”既可以是 Component、TemplateRef 或 DOM 元素，而“空白的插槽”是指 PortalOutlet。
    const panelRef = this.overlayRef.attach(panelPortal);
    panelRef.instance.searchResult = this.searchResult; // 通过这样实现把searchResult传到浮层组件
    //console.log('panelRef:',panelRef);
    //浮层点击背景板触发消失浮层
    this.overlayRef.backdropClick().subscribe(() => {
      this.hideOverlayPanel();
    });
  }

  //移除浮层
  hideOverlayPanel() {
    if (this.overlayRef && this.overlayRef.hasAttached) {
      this.overlayRef.dispose();
    }
  }

  //聚焦
  onFocus() {
    if (this.searchResult && !isEmptyObject(this.searchResult)) {
      this.showOverlayPanel();
    }
  }

  // 失焦
  onBlur() {
    this.hideOverlayPanel();
  }

  //截流
  ngAfterViewInit(): void {
    //绑定注入属性，选择在这里绑定，而不在DOM直接绑定，因为搜索框需要用rxjs操作符来进行截流，不然调度接口的次数会很频繁
    //console.log('nzInput', this.nzInput.nativeElement);
    /*     fromEvent(this.nzInput.na  tiveElement, 'input').pipe(debounceTime(300), distinctUntilChanged(), pluck('target', 'value'))
    .subscribe(value => {
      console.log('value:', value);
    }); */
    //pluck被弃用重写方法
    fromEvent(this.nzInput.nativeElement, 'input')
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        map((event: any) => event.target.value)
      )
      .subscribe((value: string) => {
        this.onSearch.emit(value);
      });
  }

  ngOnInit(): void {}
}
