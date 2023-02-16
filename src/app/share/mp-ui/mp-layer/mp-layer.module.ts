/*
 * @Author: cwj
 * @Date: 2023-02-10 19:57:22
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-13 00:56:05
 * @Introduce:
 */
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MpLayerModalComponent } from './mp-layer-modal/mp-layer-modal.component';
import { MpLayerDefaultComponent } from './mp-layer-default/mp-layer-default.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MpLayerLoginComponent } from './mp-layer-login/mp-layer-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { MpLayerRegisterComponent } from './mp-layer-register/mp-layer-register.component';

@NgModule({
  declarations: [
    MpLayerModalComponent,
    MpLayerDefaultComponent,
    MpLayerLoginComponent,
    MpLayerRegisterComponent,
  ],
  imports: [
    CommonModule,
    NzButtonModule,
    DragDropModule,
    ReactiveFormsModule,
    NzInputModule,
    NzCheckboxModule,
    NzSpinModule,
    NzAlertModule,
    NzListModule,
    NzIconModule,
    NzFormModule,
    FormsModule,
  ],
  exports: [
    MpLayerModalComponent,
    MpLayerDefaultComponent,
    MpLayerLoginComponent,
    MpLayerRegisterComponent,
  ],
})
export class MpLayerModule {}
