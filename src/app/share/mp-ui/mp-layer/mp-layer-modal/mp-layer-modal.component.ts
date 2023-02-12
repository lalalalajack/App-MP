import { DOCUMENT } from '@angular/common';
import { MemberBatchActionsService } from './../../../../store/member-batch-actions.service';
import {
  ChangeDetectorRef,
  ViewChild,
  AfterViewInit,
  Renderer2,
  Inject,
} from '@angular/core';
/*
 * @Author: cwj
 * @Date: 2023-02-10 20:07:45
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-12 20:21:21
 * @Introduce:
 */
import {
  getModalVisible,
  getModalType,
  getMember,
} from './../../../../store/selectors/member.selector';
import { AppStoreModule } from './../../../../store/index';
import { Store, select } from '@ngrx/store';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ElementRef,
} from '@angular/core';
import { ModalTypes } from 'src/app/store/reducers/member.reducer';
import {
  BlockScrollStrategy,
  Overlay,
  OverlayContainer,
  OverlayKeyboardDispatcher,
  OverlayRef,
} from '@angular/cdk/overlay';
import { WINDOW } from 'src/app/services/services.module';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-mp-layer-modal',
  templateUrl: './mp-layer-modal.component.html',
  styleUrls: ['./mp-layer-modal.component.less'],
  //这里并不能使用onPush策略，否则触发不了变更检测，或者选择注入服务，手动触发
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('showHide', [
      state('show', style({ transform: 'scale(1)', opacity: 1 })),
      state('hide', style({ transform: 'scale(0)', opacity: 0 })),
      transition('show<=>hide', animate('0.1s')),
    ]),
  ],
})
export class MpLayerModalComponent implements OnInit, AfterViewInit {
  showModal = 'hide'; //控制弹窗的显示
  private visible = false; //弹窗的显示或者隐藏
  currentModalType = ModalTypes.Default; //当前处于的弹窗类型
  private overlayRef: OverlayRef; //浮层实例，管理特定浮层
  private scrollStrategy: BlockScrollStrategy; //阻止滚动API
  private overlayContainerEl: HTMLElement;
  private resizeHandle: () => void; //监听事件句柄，便于解绑
  @ViewChild('modalContainer', { static: false }) private modalRef: ElementRef;
  constructor(
    @Inject(DOCUMENT) private doc: Document,
    @Inject(WINDOW) private win: Window,
    private store$: Store<AppStoreModule>,
    private overlay: Overlay, //浮层
    private elementRef: ElementRef, //DOM
    private overlayKeyboardDispatch: OverlayKeyboardDispatcher, //浮层API服务
    private cdr: ChangeDetectorRef, //变更策略引用API
    private memberBatchActon: MemberBatchActionsService,
    private rd: Renderer2, //渲染器
    private overlayContainerServe: OverlayContainer //所有浮层都会渲染到其中的容器。
  ) {
    const appStore$ = this.store$.pipe(select(getMember));
    appStore$
      .pipe(select(getModalVisible))
      .subscribe((visible) => this.watchModalVisible(visible));
    appStore$
      .pipe(select(getModalType))
      .subscribe((type) => this.watchModalType(type));
    this.scrollStrategy = this.overlay.scrollStrategies.block();
  }

  ngAfterViewInit(): void {
    //该方法返回浮层的容器元素。它会在第一次调用时惰性创建该元素，以便在非浏览器环境中使用该容器。
    this.overlayContainerEl = this.overlayContainerServe.getContainerElement();
    this.listenResizeToCenter();
  }

  private listenResizeToCenter() {
    const modal = this.modalRef.nativeElement; //标签ID的dom
    const modalSize = this.getHideDomSize(modal);
    console.log('modalSize:', modalSize);
    this.keepCenter(modal, modalSize); //保持弹窗居中
    //监听浏览器的变化
    this.resizeHandle = this.rd.listen('window', 'resize', () =>
      this.keepCenter(modal, modalSize)
    );
  }

  //保存弹窗居中
  private keepCenter(modal: HTMLElement, size: { w: number; h: number }) {
    const left = (this.getWindowSize(modal).w - size.w) / 2;
    const top = (this.getWindowSize(modal).h - size.h) / 2;
    modal.style.left = left + 'px';
    modal.style.top = top + 'px';
  }

  //获取隐藏dom的位置（DOM操作应该剥离封装出去）
  getHideDomSize(dom: HTMLElement) {
    //console.log('dom:',dom);
    return {
      w: dom.offsetWidth,
      h: dom.offsetHeight,
    };
  }

  //获取Window的大小（DOM操作应该剥离封装出去）
  getWindowSize(dom: HTMLElement) {
    return {
      w:
        this.win.innerWidth ||
        this.doc.documentElement.clientWidth ||
        this.doc.body.offsetWidth,
      h:
        this.win.innerHeight ||
        this.doc.documentElement.clientHeight ||
        this.doc.body.offsetHeight,
    };
  }

  //监听visible并赋值
  watchModalVisible(visible: boolean): void {
    if (this.visible !== visible) {
      this.visible = visible;
      this.handleVisibleChange(visible);
    }
  }

  //监听modalType并赋值
  watchModalType(type: ModalTypes): void {
    if (this.currentModalType !== type) {
      this.currentModalType = type;
      this.cdr.markForCheck(); // 手动触发
    }
  }

  //处理visible变化
  handleVisibleChange(visible: boolean) {
    this.showModal = visible ? 'show' : 'hide'; //赋予弹窗的显隐
    if (visible) {
      //参见浮层API
      //本服务用于将落在 body 上的键盘事件派发到适当的浮层引用（如果有）
      //Method:add:将新的浮层添加到已附加的浮层引用列表中。
      this.overlayKeyboardDispatch.add(this.overlayRef); //添加键盘事件的派发
      this.scrollStrategy.enable(); //打开已附加的浮层时阻止页面级滚动。
      this.listenResizeToCenter(); //显示的时候再此监听
      this.changePointerEvents('auto');
    } else {
      this.scrollStrategy.disable(); //打开已附加的浮层时，取消阻止页面级滚动。
      this.overlayKeyboardDispatch.remove(this.overlayRef); //取消键盘事件的派发
      this.resizeHandle(); //取消监听
      this.changePointerEvents('none');
    }
    this.cdr.markForCheck(); // 手动触发
  }

  private changePointerEvents(type: 'none' | 'auto') {
    if (this.overlayContainerEl) {
      this.overlayContainerEl.style.pointerEvents = type;
    }
  }

  ngOnInit(): void {
    this.createOverlay();
  }

  //创建浮层方法
  createOverlay() {
    this.overlayRef = this.overlay.create();
    this.overlayRef.overlayElement.appendChild(this.elementRef.nativeElement);
    this.overlayRef.keydownEvents().subscribe((e) => this.keydownListener(e));
  }

  //监听键盘事件
  private keydownListener(e: KeyboardEvent): void {
    //ES6中，使用键盘事件的KeyCode属性已被废弃。取而代之的使用key或者code属性来检测按下的健
    // if(e.keyCode===escape){
    //   this.hide();
    // }
    if (e.key === 'Escape') {
      this.hide();
    }
  }

  //隐藏弹窗
  hide() {
    this.memberBatchActon.controlModal(false);
  }
}
