/*
 * @Author: cwj
 * @Date: 2023-02-10 19:57:22
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-11 15:34:40
 * @Introduce: 
 */
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MpLayerModalComponent } from './mp-layer-modal/mp-layer-modal.component';
import { MpLayerDefaultComponent } from './mp-layer-default/mp-layer-default.component';



@NgModule({
  declarations: [
    MpLayerModalComponent,
    MpLayerDefaultComponent
  ],
  imports: [
    CommonModule,
    NzButtonModule
  ],
  exports: [
    MpLayerModalComponent,
    MpLayerDefaultComponent
  ]
})
export class MpLayerModule { }
