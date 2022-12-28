/*
 * @Author: cwj
 * @Date: 2022-12-11 22:42:02
 * @LastEditors: cwj
 * @LastEditTime: 2022-12-22 18:26:12
 * @Introduce: 
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MpPlayerComponent } from './mp-player.component';
import { MpSliderModule } from '../mp-slider/mp-slider.module';
import { FormsModule } from '@angular/forms';
import { FormatTimePipe } from '../../pipes/format-time.pipe';



@NgModule({
    declarations: [
        MpPlayerComponent,
        FormatTimePipe
    ],
    exports: [
        MpPlayerComponent,
        FormatTimePipe
    ],
    imports: [
        CommonModule,
        MpSliderModule,
        FormsModule,
    ]
})
export class MpPlayerModule { }
