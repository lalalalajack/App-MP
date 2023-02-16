/*
 * @Author: cwj
 * @Date: 2022-12-09 21:49:47
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-16 15:03:38
 * @Introduce:
 */
import { LoginParams } from './../share/mp-ui/mp-layer/mp-layer-login/mp-layer-login.component';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG, ServicesModule } from './services.module';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { User } from './data-types/member.types';

export class Hello {
  msg?: string;
}

@Injectable({
  providedIn: ServicesModule,
})
export class MemberService {
  constructor(
    private http: HttpClient,
    @Inject(API_CONFIG) private uri: string
  ) {}

  //登录
  login(formValue: LoginParams): Observable<User> {
    //formValue:{phone: '15259598649', password: '666888', remember: true}
    //fromString:phone=15259598649&password=666888&remember=true
    const phone = formValue.phone;
    const password = formValue.password;
    return this.http
      .post('api/login', { phone, password })
      .pipe(map((res) => res as User));
  }

  helloWorld() {
    this.http
      .post<Hello>('api/helloWorld', { msg: 'hello world from client' })
      .subscribe((msg) => {
        console.log('msg:', msg);
      });
  }

  //获取用户详细信息
  getUserInfo(id: string): Observable<User> {
    const params = new HttpParams().set('phone',id)
    return this.http.get('api/detail', { params })
    .pipe(map((res) => res as User));
  }

}
