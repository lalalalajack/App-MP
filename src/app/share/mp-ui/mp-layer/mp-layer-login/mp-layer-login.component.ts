import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mp-layer-login',
  templateUrl: './mp-layer-login.component.html',
  styleUrls: ['./mp-layer-login.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MpLayerLoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
