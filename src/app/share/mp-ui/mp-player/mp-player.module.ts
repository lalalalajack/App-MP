/*
 * @Author: cwj
 * @Date: 2022-12-11 22:42:02
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-01 01:09:01
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
import { ClickoutsideDirective } from '../../directives/clickoutside.directive';



@NgModule({
    declarations: [
        MpPlayerComponent,
        FormatTimePipe,
        MpPlayerPanelComponent,
        MpScrollComponent,
        ClickoutsideDirective
    ],
    imports: [
        CommonModule,
        MpSliderModule,
        FormsModule,
    ],
    exports: [
        MpPlayerComponent,
        FormatTimePipe,
        ClickoutsideDirective
    ],
    providers: [{ provide: NzModalService }],
})
export class MpPlayerModule { }
