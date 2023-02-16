/*
 * @Author: cwj
 * @Date: 2023-02-13 00:18:34
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-16 18:59:24
 * @Introduce:
 */
import { SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { codeJson } from 'src/app/utils/base64';

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
export class MpLayerLoginComponent implements OnInit, OnChanges {
  formModel: FormGroup;
  @Input() mpRememberLogin: LoginParams;
  @Output() onChangeModalType = new EventEmitter();
  @Output() onLogin = new EventEmitter<LoginParams>();
  constructor(private fb: FormBuilder) {
    this.formModel = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern(/^1\d{10}$/)]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^[^<>'\s&quot;]+$/),
        ],
      ],
      remember: [false],
    });
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    const userLoginParams = changes['mpRememberLogin'];
    if (userLoginParams) {
      let phone = '';
      let password = '';
      let remember = false;
      if (userLoginParams.currentValue) {
        const value = codeJson(userLoginParams.currentValue, 'decode');
        phone = value['phone'];
        password = value['password'];
        remember = value['remember'];
      }
      this.setModel({ phone, password, remember });
    }
  }

  private setModel({ phone, password, remember }) {
    this.formModel = this.fb.group({
      phone: [phone, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
      password: [
        password,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^[^<>'\s&quot;]+$/),
        ],
      ],
      remember: [remember],
    });
  }

  //提交事件
  onSubmit() {
    //console.log('formModel:',this.formModel.get('password').value);
    //console.log('formModel', this.formModel.value);
    const model = this.formModel;
    if (model.valid) {
      //表单通过验证
      //console.log('value:', model.value);
      this.onLogin.emit(model.value);
    }
  }
}
