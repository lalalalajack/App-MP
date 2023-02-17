/*
 * @Author: cwj
 * @Date: 2023-02-01 15:32:01
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-17 15:29:23
 * @Introduce: 
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SheetListComponent } from './sheet-list.component';

const routes: Routes = [
  {
    path: 'sheet', component: SheetListComponent, data: { title: '歌单' }
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SheetListRoutingModule { }
