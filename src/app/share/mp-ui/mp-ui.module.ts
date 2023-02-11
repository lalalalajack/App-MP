import { MpLayerModule } from './mp-layer/mp-layer.module';
/*
 * @Author: cwj
 * @Date: 2022-12-11 18:05:35
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-11 15:26:43
 * @Introduce: 
 */
import { NgModule } from '@angular/core';
import { PlayCountPipe } from '../pipes/play-count.pipe';
import { MpPlayerModule } from './mp-player/mp-player.module';
import { MpSliderModule } from './mp-slider/mp-slider.module';
import { SingleSheetComponent } from './single-sheet/single-sheet.component';
import { MpSearchModule } from './mp-search/mp-search.module';

@NgModule({
  declarations: [
    SingleSheetComponent,
    PlayCountPipe,
  ],
  imports: [
    MpPlayerModule,
    MpSliderModule,
    MpSearchModule,
    MpLayerModule
  ],
  exports:[
    SingleSheetComponent,
    PlayCountPipe,
    MpPlayerModule,
    MpSliderModule,
    MpSearchModule,
    MpLayerModule
  ]
})
export class MpUiModule { }
