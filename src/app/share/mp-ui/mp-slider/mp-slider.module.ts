/*
 * @Author: cwj
 * @Date: 2022-12-13 14:40:36
 * @LastEditors: cwj
 * @LastEditTime: 2022-12-13 16:40:19
 * @Introduce: 
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MpSliderComponent } from './mp-slider.component';
import { MpSliderHandleComponent } from './mp-slider-handle.component';
import { MpSliderTrackComponent } from './mp-slider-track.component';



@NgModule({
  declarations: [
    MpSliderComponent,
    MpSliderTrackComponent,
    MpSliderHandleComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    MpSliderComponent
  ]
})
export class MpSliderModule { }
