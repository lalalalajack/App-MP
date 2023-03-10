/*
 * @Author: cwj
 * @Date: 2022-12-09 18:26:10
 * @LastEditors: cwj
 * @LastEditTime: 2022-12-22 11:58:51
 * @Introduce: 
 */
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { MpPlayerModule } from "./share/mp-ui/mp-player/mp-player.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MpLayerModule } from "./share/mp-ui/mp-layer/mp-layer.module";


@NgModule({
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent],
    imports: [
        CoreModule,
        MpPlayerModule,
        BrowserAnimationsModule,
        MpLayerModule
    ]
})
export class AppModule { }
