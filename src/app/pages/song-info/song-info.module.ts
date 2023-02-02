import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SongInfoRoutingModule } from './song-info-routing.module';
import { SongInfoComponent } from './song-info.component';
import { ShareModule } from 'src/app/share/share.module';


@NgModule({
  declarations: [
    SongInfoComponent
  ],
  imports: [
    ShareModule,
    CommonModule,
    SongInfoRoutingModule
  ]
})
export class SongInfoModule { }
