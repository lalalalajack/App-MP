/*
 * @Author: cwj
 * @Date: 2023-02-10 19:57:22
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-12 19:09:49
 * @Introduce:
 */
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MpLayerModalComponent } from './mp-layer-modal/mp-layer-modal.component';
import { MpLayerDefaultComponent } from './mp-layer-default/mp-layer-default.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MpLayerLoginComponent } from './mp-layer-login/mp-layer-login.component';

@NgModule({
  declarations: [
    MpLayerModalComponent,
    MpLayerDefaultComponent,
    MpLayerLoginComponent,
  ],
  imports: [CommonModule, NzButtonModule, DragDropModule],
  exports: [MpLayerModalComponent, MpLayerDefaultComponent,MpLayerLoginComponent],
})
export class MpLayerModule {}
