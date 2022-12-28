/*
 * @Author: cwj
 * @Date: 2022-12-22 08:43:25
 * @LastEditors: cwj
 * @LastEditTime: 2022-12-22 16:28:46
 * @Introduce: 
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
    StoreDevtoolsModule.instrument({
      maxAge:20,
      logOnly:environment.production,
    })
  ]
})
export class AppStoreModule { }
