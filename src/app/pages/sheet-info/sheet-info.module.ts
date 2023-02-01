import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SheetInfoRoutingModule } from './sheet-info-routing.module';
import { SheetInfoComponent } from './sheet-info.component';
import { ShareModule } from 'src/app/share/share.module';


@NgModule({
  declarations: [
    SheetInfoComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    SheetInfoRoutingModule
  ]
})
export class SheetInfoModule { }
