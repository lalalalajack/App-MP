import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
/*
 * @Author: cwj
 * @Date: 2023-02-03 22:32:21
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-05 20:04:12
 * @Introduce: 
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MpSearchComponent } from './mp-search.component';
import { MpSearchPanelComponent } from './mp-search-panel/mp-search-panel.component';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    MpSearchComponent,
    MpSearchPanelComponent
  ],
  entryComponents:[MpSearchPanelComponent],
  imports: [
    CommonModule,
    NzInputModule,
    NzIconModule,
    OverlayModule
  ],
  exports: [
    MpSearchComponent
  ]
})
export class MpSearchModule { }
