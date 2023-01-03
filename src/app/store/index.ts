/*
 * @Author: cwj
 * @Date: 2022-12-22 08:43:25
 * @LastEditors: cwj
 * @LastEditTime: 2023-01-04 01:11:22
 * @Introduce: ngrx初始化播放器 在配置模块下注入StoreModule，定义启动reducer，在actions中定义动作，reducer中注册使用。
 */
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { playerReducer } from './reducers/player.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';



@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot({ player: playerReducer },{
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
      },
    }),
      // 调试插件   
    StoreDevtoolsModule.instrument({
      maxAge:20,
      logOnly:environment.production,// 生产环境下仅打印log
    })
  ]
})
export class AppStoreModule { }
