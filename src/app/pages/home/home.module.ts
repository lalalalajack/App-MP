/*
 * @Author: cwj
 * @Date: 2022-12-09 21:18:04
 * @LastEditors: cwj
 * @LastEditTime: 2022-12-11 20:52:05
 * @Introduce: 
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ShareModule } from 'src/app/share/share.module';
import { HomeComponent } from './home.component';
import { MpCarouselComponent } from './components/mp-carousel/mp-carousel.component';
import { MemberCardComponent } from './components/member-card/member-card.component';


@NgModule({
  declarations: [
    HomeComponent,
    MpCarouselComponent,
    MemberCardComponent,
  ],
  imports: [
    CommonModule,
    ShareModule,
    HomeRoutingModule,
  ]

})
export class HomeModule { }
