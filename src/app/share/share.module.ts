/*
 * @Author: cwj
 * @Date: 2022-12-09 19:15:22
 * @LastEditors: cwj
 * @LastEditTime: 2022-12-22 18:27:38
 * @Introduce: 
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { MpUiModule } from './mp-ui/mp-ui.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzLayoutModule,
    NzInputModule,
    NzTabsModule,
    NzIconModule,
    NzMenuModule,
    NzCarouselModule,
    MpUiModule
  ],
  exports:[
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzLayoutModule,
    NzInputModule,
    NzTabsModule,
    NzIconModule,
    NzMenuModule,
    NzCarouselModule,
    MpUiModule
  ]
})
export class ShareModule { }
