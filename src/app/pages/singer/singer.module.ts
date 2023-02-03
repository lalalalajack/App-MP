/*
 * @Author: cwj
 * @Date: 2023-02-03 02:41:19
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-03 16:01:38
 * @Introduce: 
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingerRoutingModule } from './singer-routing.module';
import { ShareModule } from 'src/app/share/share.module';
import { SingerDetailComponent } from './singer-detail/singer-detail.component';
import { NzMessageService } from 'ng-zorro-antd/message';


@NgModule({
  declarations: [
    SingerDetailComponent
  ],
  imports: [
    ShareModule,
    CommonModule,
    SingerRoutingModule
  ],
  providers: [{ provide: NzMessageService }],
})
export class SingerModule { }
