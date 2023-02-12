import { LoginParams } from './../share/mp-ui/mp-layer/mp-layer-login/mp-layer-login.component';
/*
 * @Author: cwj
 * @Date: 2022-12-09 21:49:47
 * @LastEditors: cwj
 * @LastEditTime: 2023-02-13 03:26:53
 * @Introduce: 
 */
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG, ServicesModule } from './services.module';
import { Banner, HotTag, SongSheet } from './data-types/common.types';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { User } from './data-types/member.types';
import * as qs from 'qs';

@Injectable({
  providedIn: ServicesModule
})
export class MemberService {

  constructor(private http: HttpClient, @Inject(API_CONFIG) private uri: string) { }

  login(formValue:LoginParams): Observable<User> {
    const params = new HttpParams({fromString:qs.stringify(formValue)});
    return this.http.get(this.uri + 'login/cellphone',{params})
      .pipe(map((res: { profile: User }) => res.profile));
    //return this.http.get<{banners: Banner[]}>(this.uri + 'banner') ;
  }

}
