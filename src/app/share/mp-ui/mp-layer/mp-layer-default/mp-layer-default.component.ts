import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mp-layer-default',
  templateUrl: './mp-layer-default.component.html',
  styleUrls: ['./mp-layer-default.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MpLayerDefaultComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
