/*
 * @Author: cwj
 * @Date: 2022-12-09 19:17:29
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-01 19:36:29
 * @Introduce: 
 */
import { NgModule } from '@angular/core';
import { HomeModule } from './home/home.module';
import { SheetListModule } from './sheet-list/sheet-list.module';
import { SheetInfoModule } from './sheet-info/sheet-info.module';
import { SongInfoModule } from './song-info/song-info.module';
import { SingerModule } from './singer/singer.module';


@NgModule({
  declarations: [],
  imports: [
    HomeModule,
    SheetListModule,
    SheetInfoModule,
    SongInfoModule,
    SingerModule
  ],
  exports:[
    HomeModule,
    SheetListModule,
    SheetInfoModule,
    SongInfoModule,
    SingerModule
  ]
})
export class PagesModule { }