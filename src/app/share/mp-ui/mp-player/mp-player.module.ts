/*
 * @Author: cwj
 * @Date: 2022-12-11 22:42:02
 * @LastEditors: cwj
 * @LastEditTime: 2023-01-31 23:30:40
 * @Introduce: 
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MpPlayerComponent } from './mp-player.component';
import { MpSliderModule } from '../mp-slider/mp-slider.module';
import { FormsModule } from '@angular/forms';
import { FormatTimePipe } from '../../pipes/format-time.pipe';
import { MpPlayerPanelComponent } from './mp-player-panel/mp-player-panel.component';
import { MpScrollComponent } from './mp-scroll/mp-scroll.component';
import { NzModalService } from 'ng-zorro-antd/modal';



@NgModule({
    declarations: [
        MpPlayerComponent,
        FormatTimePipe,
        MpPlayerPanelComponent,
        MpScrollComponent,
    ],
    exports: [
        MpPlayerComponent,
        FormatTimePipe
    ],
    imports: [
        CommonModule,
        MpSliderModule,
        FormsModule,
    ],
    providers: [{provide: NzModalService}],
})
export class MpPlayerModule { }
