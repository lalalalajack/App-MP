import { MemberService } from 'src/app/services/member.service';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface RegisterParams {
  phone: string;
  password: string;
}

@Component({
  selector: 'app-mp-layer-register',
  templateUrl: './mp-layer-register.component.html',
  styleUrls: ['./mp-layer-register.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MpLayerRegisterComponent implements OnInit {
  formModel: FormGroup;
  @Output() onRegister = new EventEmitter<FormGroup>();
  constructor(
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
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
    });
  }

  onSubmit(): void {
    const model = this.formModel;
    if (model.valid) {
      //表单通过验证
      this.onRegister.emit(model);
    }
  }
}
