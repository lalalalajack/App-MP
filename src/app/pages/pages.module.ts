/*
 * @Author: cwj
 * @Date: 2022-12-09 19:17:29
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-01 16:15:32
 * @Introduce: 
 */
import { NgModule } from '@angular/core';
import { HomeModule } from './home/home.module';
import { SheetListModule } from './sheet-list/sheet-list.module';


@NgModule({
  declarations: [],
  imports: [
    HomeModule,
    SheetListModule
  ],
  exports:[
    HomeModule,
    SheetListModule
  ]
})
export class PagesModule { }