/*
 * @Author: cwj
 * @Date: 2023-02-03 02:41:19
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-03 03:52:01
 * @Introduce: 
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingerDetailComponent } from './singer-detail/singer-detail.component';
import { SingerResolverService } from './singer-resolver.service';

const routes: Routes = [{
  path: 'singer/:id', component: SingerDetailComponent, data: { title: '歌手详情' }, resolve: { singerDetail: SingerResolverService }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [SingerResolverService]
})
export class SingerRoutingModule { }
