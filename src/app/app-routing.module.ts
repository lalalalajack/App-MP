/*
 * @Author: cwj
 * @Date: 2022-12-09 18:26:10
 * @LastEditors: cwj
 * @LastEditTime: 2022-12-09 21:38:15
 * @Introduce: 
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //pathMatch 是指定匹配策略的字符串。pathMatch:'full'表示完全匹配
  {path:'',redirectTo:'/home',pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
