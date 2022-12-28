/*
 * @Author: cwj
 * @Date: 2022-12-11 19:13:10
 * @LastEditors: cwj
 * @LastEditTime: 2022-12-11 19:46:36
 * @Introduce: 
 */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Singer } from './data-types/common.types';
import { API_CONFIG, ServicesModule } from './services.module';

type SingerParams = {
  //详情见API描述
  //分页
  offset: number;
  //每页多少
  limit: number;
  cat?: string;
}

//默认参数，首页右侧列表是默认的
const defaultParams = {
  offset: 0,
  limit: 9,
  cat: '5001'
}

@Injectable({
  providedIn: ServicesModule
})
export class SingerService {

  constructor(private http: HttpClient, @Inject(API_CONFIG) private uri: string) { }

  getEnterSinger(args: SingerParams = defaultParams): Observable<Singer[]> {
    //按照httpclient模块的传参方式
    //必须序列化
    const params = new HttpParams({ fromString:JSON.stringify(args)});
    return this.http.get(this.uri + 'artist/list',{params})
      .pipe(map((res: { artists: Singer[] }) => res.artists));
  }
}
