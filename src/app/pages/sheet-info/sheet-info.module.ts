/*
 * @Author: cwj
 * @Date: 2023-02-01 19:35:16
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-02 23:06:38
 * @Introduce: 
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SheetInfoRoutingModule } from './sheet-info-routing.module';
import { SheetInfoComponent } from './sheet-info.component';
import { ShareModule } from 'src/app/share/share.module';
import { NzMessageService } from 'ng-zorro-antd/message';


@NgModule({
  declarations: [
    SheetInfoComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    SheetInfoRoutingModule
  ],
  providers: [{ provide: NzMessageService }],
})
export class SheetInfoModule { }
