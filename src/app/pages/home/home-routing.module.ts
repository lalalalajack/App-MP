/*
 * @Author: cwj
 * @Date: 2022-12-09 21:18:04
 * @LastEditors: cwj
 * @LastEditTime: 2022-12-11 21:10:25
 * @Introduce: 
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeResolverService } from './home-resolve.service';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, data: { title: '发现' }, resolve: { homeDatas: HomeResolverService } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[HomeResolverService]
})
export class HomeRoutingModule { }
