/*
 * @Author: cwj
 * @Date: 2023-02-13 00:18:34
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-13 03:37:05
 * @Introduce:
 */
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';

export interface LoginParams {
  phone: string;
  password: string;
  remember: boolean;
}

@Component({
  selector: 'app-mp-layer-login',
  templateUrl: './mp-layer-login.component.html',
  styleUrls: ['./mp-layer-login.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MpLayerLoginComponent implements OnInit {
  formModel: FormGroup;
  @Output() onChangeModalType = new EventEmitter();
  @Output() onLogin = new EventEmitter<LoginParams>();
  constructor(private fb: FormBuilder) {
    this.formModel = this.fb.group({
      phone: ['132',[Validators.required,Validators.pattern(/^1\d{10}$/)]],
      password: ['666',[Validators.required,Validators.minLength(6),Validators.pattern(/^[^<>'\s&quot;]+$/)]],
      remember: [false],
    });
  }

  ngOnInit(): void {}

  //提交事件
  onSubmit() {
    //console.log('formModel:',this.formModel.get('password').value);
    //console.log('formModel', this.formModel.value);
    const model = this.formModel;
    if (model.valid) {
      //表单通过验证
      console.log('value:', model.value);
    }
  }
}
