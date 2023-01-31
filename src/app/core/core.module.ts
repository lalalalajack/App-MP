/*
 * @Author: cwj
 * @Date: 2022-12-09 19:07:58
 * @LastEditors: cwj
 * @LastEditTime: 2023-01-31 22:36:50
 * @Introduce: 
 */
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagesModule } from '../pages/pages.module';
import { ServicesModule } from '../services/services.module';
import { ShareModule } from '../share/share.module';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { NZ_I18N, zh_CN} from 'ng-zorro-antd/i18n';
import { AppStoreModule } from '../store';
registerLocaleData(zh);


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ServicesModule,
    PagesModule,
    ShareModule,
    AppStoreModule,
    AppRoutingModule,
  ],
  exports:[
    ShareModule,
    AppRoutingModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN }
  ]
})
export class CoreModule {
  //skipSelf 跳过自身检测  Optional 可选
  constructor(@SkipSelf() @Optional() parentModule:CoreModule){
    if(parentModule){
      throw new Error('CoreModule 只能被appModule引入');
    }
  }
 }
