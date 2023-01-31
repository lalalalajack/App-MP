/*
 * @Author: cwj
 * @Date: 2022-12-11 18:05:35
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-01 02:20:54
 * @Introduce: 
 */
import { NgModule } from '@angular/core';
import { PlayCountPipe } from '../pipes/play-count.pipe';
import { MpPlayerModule } from './mp-player/mp-player.module';
import { MpSliderModule } from './mp-slider/mp-slider.module';
import { SingleSheetComponent } from './single-sheet/single-sheet.component';


@NgModule({
  declarations: [
    SingleSheetComponent,
    PlayCountPipe,
  ],
  imports: [
    MpPlayerModule,
    MpSliderModule,
  ],
  exports:[
    SingleSheetComponent,
    PlayCountPipe,
    MpPlayerModule,
    MpSliderModule
  ]
})
export class MpUiModule { }
